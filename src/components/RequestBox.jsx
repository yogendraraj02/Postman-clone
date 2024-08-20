// import React, { useState } from 'react';
// import { makeRequest } from '../utils/api';

// function RequestBox({ onResponse, onError }) {
//   const [method, setMethod] = useState('GET');
//   const [url, setUrl] = useState('');
//   const [body, setBody] = useState('');
//   const [headers, setHeaders] = useState('');
//   const [queryParams, setQueryParams] = useState('');
//   const [authType, setAuthType] = useState('');
//   const [authCredentials, setAuthCredentials] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log(`on submit`);
    
//     try {
//       const requestConfig = {
//         method,
//         url,
//         headers: headers ? JSON.parse(headers) : {},
//         body: body ? JSON.parse(body) : undefined,
//         queryParams: queryParams ? JSON.parse(queryParams) : undefined,
//         authType,
//         authCredentials: authCredentials ? JSON.parse(authCredentials) : undefined
//       };
      
//       const response = await makeRequest(requestConfig);
//       onResponse(response);
//     } catch (error) {
//       onError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="request-box box-shadow">
//       <h2 className="request-title">New Request</h2>
//       <p className="request-subtitle">Create a new API request</p>
//       <form className="request-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label className="form-label">Method</label>
//           <select 
//             className="form-input"
             
//             value={method} 
//             onChange={(e) => setMethod(e.target.value)}
//           >
//             <option>GET</option>
//             <option>POST</option>
//             <option>PUT</option>
//             <option>DELETE</option>
//             <option>PATCH</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label className="form-label">URL</label>
//           <input 
//             type="text" 
//             // className={`form-input form-control ${url ? '' : 'invalid'}`} 
//             className={`form-control ${!url.trim() ? 'is-invalid' : ''}`}
//             placeholder="https://api.example.com/v1/users" 
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             required
            
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Headers (JSON)</label>
//           <textarea 
//             className="form-input" 
//             placeholder='{"Content-Type": "application/json"}'
//             value={headers}
//             onChange={(e) => setHeaders(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label className="form-label">Body (JSON)</label>
//           <textarea 
//             className="form-input" 
//             placeholder='{"key": "value"}'
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label className="form-label">Query Params (JSON)</label>
//           <textarea 
//             className="form-input" 
//             placeholder='{"key": "value"}'
//             value={queryParams}
//             onChange={(e) => setQueryParams(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label className="form-label">Auth Type</label>
//           <select 
//             className="form-input" 
//             value={authType} 
//             onChange={(e) => setAuthType(e.target.value)}
//           >
//             <option value="">None</option>
//             <option value="basic">Basic</option>
//             <option value="bearer">Bearer</option>
//           </select>
//         </div>
//         {authType && (
//           <div className="form-group">
//             <label className="form-label">Auth Credentials (JSON)</label>
//             <textarea 
//               className="form-input" 
//               placeholder={authType === 'basic' ? '{"username": "user", "password": "pass"}' : '{"token": "your-token"}'}
//               value={authCredentials}
//               onChange={(e) => setAuthCredentials(e.target.value)}
//             ></textarea>
//           </div>
//         )}
//         <div className="submit-btn-group">
//           <button type="submit" className="button button-primary" disabled={loading}>
//             {loading ? 'Sending...' : 'Send'}
//           </button>
//           <button type="button" className="button" onClick={() => {
//             setMethod('GET')
//             setUrl('')
//             setBody('')
//             setHeaders('')
//             setQueryParams('')
//             setAuthType('')
//             setAuthCredentials('')
//           }}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default RequestBox;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeRequest } from '../utils/api';
import axios from 'axios';
import { BASE_URL } from '../config';
const isValidUrl = (url) => {
  const urlToTest = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  try {
    new URL(urlToTest);
    return true;
  } catch (error) {
    return false;
  }
};


const validationSchema = Yup.object().shape({
  method: Yup.string().required('Method is required'),
  // url: Yup.string().url('Invalid URL').required('URL is required'),
  url: Yup.string()
  .test('is-url-valid', 'Invalid URL', isValidUrl)
  .required('URL is required'),

  headers: Yup.string().test('is-json', 'Must be valid JSON', (value) => {
    if (!value) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
  body: Yup.string().test('is-json', 'Must be valid JSON', (value) => {
    if (!value) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
  queryParams: Yup.string().test('is-json', 'Must be valid JSON', (value) => {
    if (!value) return true;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }),
  authType: Yup.string(),
  authCredentials: Yup.string().when('authType', {
    is: (value) => !!value,
    then: () => Yup.string()
      .required('Auth credentials are required when auth type is selected')
      .test('is-json', 'Must be valid JSON', (value) => {
        if (!value) return false;
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      }),
    otherwise: () => Yup.string(),
  }),
});

function RequestBox({ onResponse, onError }) {
  const initialValues = {
    method: 'GET',
    url: '',
    headers: '',
    body: '',
    queryParams: '',
    authType: '',
    authCredentials: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const requestConfig = {
        method: "POST",
        url: `${BASE_URL}/api/proxy`, 
        data: {
          method: values.method,
          url: values.url,
          headers: values.headers ? JSON.parse(values.headers) : {},
          body: values.body ? JSON.parse(values.body) : undefined,
          queryParams: values.queryParams ? JSON.parse(values.queryParams) : undefined,
          authType: values.authType,
          authCredentials: values.authCredentials ? JSON.parse(values.authCredentials) : undefined,
        }
      };
  
      const response = await axios(requestConfig);
      onResponse(response.data);
    } catch (error) {
      onError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="request-box box-shadow">
      <h2 className="request-title">New Request</h2>
      <p className="request-subtitle">Create a new API request</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="request-form">
            <div className="form-group">
              <label className="form-label">Method</label>
              <Field as="select" name="method" className="form-control">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                <option>PATCH</option>
              </Field>
              <ErrorMessage name="method" component="div" className="text-danger" />
            </div>
            <div className="form-group">
  <label className="form-label">URL</label>
  <Field name="url">
    {({ field, form }) => (
      <input
        type="text"
        {...field}
        className={`form-control ${form.errors.url && form.touched.url ? 'is-invalid' : ''}`}
        placeholder="https://api.example.com/v1/users"
      />
    )}
  </Field>
  <ErrorMessage name="url" component="div" className="invalid-feedback" />
</div>
            <div className="form-group">
              <label className="form-label">Headers (JSON)</label>
              <Field
                as="textarea"
                name="headers"
                className="form-control"
                placeholder='{"Content-Type": "application/json"}'
              />
              <ErrorMessage name="headers" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label className="form-label">Body (JSON)</label>
              <Field
                as="textarea"
                name="body"
                className="form-control"
                placeholder='{"key": "value"}'
              />
              <ErrorMessage name="body" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label className="form-label">Query Params (JSON)</label>
              <Field
                as="textarea"
                name="queryParams"
                className="form-control"
                placeholder='{"key": "value"}'
              />
              <ErrorMessage name="queryParams" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label className="form-label">Auth Type</label>
              <Field as="select" name="authType" className="form-control">
                <option value="">None</option>
                <option value="basic">Basic</option>
                <option value="bearer">Bearer</option>
              </Field>
              <ErrorMessage name="authType" component="div" className="text-danger" />
            </div>
            {values.authType && (
              <div className="form-group">
                <label className="form-label">Auth Credentials (JSON)</label>
                <Field
                  as="textarea"
                  name="authCredentials"
                  className="form-control"
                  placeholder={values.authType === 'basic' ? '{"username": "user", "password": "pass"}' : '{"token": "your-token"}'}
                />
                <ErrorMessage name="authCredentials" component="div" className="text-danger" />
              </div>
            )}
            <div className="submit-btn-group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
              <button type="reset" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RequestBox;