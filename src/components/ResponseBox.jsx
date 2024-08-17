import React from 'react'

// ResponseBox.js
function ResponseBox({response, error}) {
    console.log(`response`,response);

     // Early return if there's an error
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

  // Early return if there's no response
  if (!response) {
    return (
      <div className="response-box box-shadow">
        <h2 className="request-title">Response</h2>
        <p>No response received yet.</p>
      </div>
    );
  }

  // Render the response details
  return (
    <div className="response-box box-shadow">
      <h2 className="request-title">Response</h2>
      <p className="request-subtitle">View the API response</p>
      <div className="response-header">
        <span className="response-status">{response.status} OK</span>
        <span className="response-time">{response.responseTime % 1000} ms</span>
      </div>
      <div>Content-Type: {response.headers['content-type']}</div>
      <div>Content-Length: {response.headers['content-length']} bytes</div>
      <pre className="response-content">
        {JSON.stringify(response.data, null, 2)}
      </pre>
    </div>
  );

    // return (
    //   <div className="response-box box-shadow">
    //     <h2 className="request-title">Response</h2>
    //     <>
    //     <p className="request-subtitle">View the API response</p>
    //     <div className="response-header">
    //       <span className="response-status">{response.status} OK</span>
    //       <span className="response-time">{response.responseTime % 1000} ms</span>
    //     </div>
    //     <div>Content-Type: {response.headers["content-type"]}</div>
    //     <div>Content-Length: 1024 bytes</div>
    //     <pre className="response-content">
            
    //       {/* JSON response would go here */}
    //       {JSON.stringify({
    //         "id": "1234",
    //         "name": "John Doe",
    //         "email": "john@example.com",
    //         "createdAt": "2023-04-01T12:00:00Z"
    //       })}
    //     </pre>
    //     </>
    //   </div>
    // )
  }

export default ResponseBox



