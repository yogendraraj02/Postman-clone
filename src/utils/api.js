import axios from 'axios';

const sendRequest = async (config) => {
  const startTime = Date.now();
  
  try {
    const response = await axios(config);
    const endTime = Date.now();
    
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
      responseTime: endTime - startTime
    };
  } catch (error) {
    const endTime = Date.now();
    
    throw {
      error: error.response ? error.response.data : error.message,
      status: error.response ? error.response.status : null,
      headers: error.response ? error.response.headers : null,
      responseTime: endTime - startTime
    };
  }
};

export const makeRequest = async (requestConfig) => {
  const {
    method,
    url,
    headers = {},
    body,
    queryParams,
    authType,
    authCredentials
  } = requestConfig;

  let config = {
    method,
    url,
    headers,
    params: queryParams
  };

  if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
    config.data = body;
  }

  // Handle authentication
  if (authType === 'basic') {
    config.auth = authCredentials;
  } else if (authType === 'bearer') {
    config.headers['Authorization'] = `Bearer ${authCredentials.token}`;
  }
  // Add other auth types as needed

  const result = await sendRequest(config);
  
  // Handle the result (update UI, etc.)
  console.log(result);
  return result;
};