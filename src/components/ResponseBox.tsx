import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import HTMLReactParser from 'html-react-parser';
import { Tab, Tabs } from 'react-bootstrap';
import { ResponseBoxProps } from '../types/request';

const ResponseBox: React.FC<ResponseBoxProps> = ({ response, error }) => {  
  const [activeTab, setActiveTab] = useState<string>('formatted');
  console.log(`response received`,response);
  console.log(`error received`,error);
  
  if (error) {
    return (
      <div className="response-box box-shadow">
        <h2 className="request-title">Response</h2>
        <div className="error-message">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="response-box box-shadow">
        <h2 className="request-title">Response</h2>
        <p>No response received yet.</p>
      </div>
    );
  }

  const isJsonContent = response.data.headers['content-type']?.includes('application/json');
  const isHtmlContent = response.data.headers['content-type']?.includes('text/html');

  const renderContent = () => {
    if (isJsonContent) {
      return (
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k!)} className="mb-3">
          <Tab eventKey="formatted" title="Formatted">
            <ReactJson src={response.data} theme="rjv-default" />
          </Tab>
          <Tab eventKey="raw" title="Raw">
            <pre className="response-content">{JSON.stringify(response.data.data, null, 2)}</pre>
          </Tab>
        </Tabs>
      );
    } else if (isHtmlContent) {
      console.log(`html content`,response.data.data);
      
      return (
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k!)} className="mb-3">
          <Tab eventKey="rendered" title="Rendered">
            <div className="html-preview">{HTMLReactParser(response.data.data)}</div>
          </Tab>
          <Tab eventKey="source" title="Source">
            <pre className="response-content">{response.data.data}</pre>
          </Tab>
        </Tabs>
      );
    } else {
      return <pre className="response-content">{response.data.data}</pre>;
    }
  };

  return (
    <div className="response-box box-shadow">
      <h2 className="request-title">Response</h2>
      <p className="request-subtitle">View the API response</p>
      <div className="response-header">
        <span className="response-status">{response.data.status} OK</span>
        <span className="response-time">{response.data.responseTime} ms</span>
      </div>
      <div>Content-Type: {response.data.headers['content-type']}</div>
      <div>Content-Length: {response.data.headers['content-length']} bytes</div>
      {renderContent()}
    </div>
  );
}

export default ResponseBox;