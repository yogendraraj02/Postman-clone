import React from 'react'

// ResponseBox.js
function ResponseBox() {
    return (
      <div className="response-box box-shadow">
        <h2 className="request-title">Response</h2>
        <p className="request-subtitle">View the API response</p>
        <div className="response-header">
          <span className="response-status">200 OK</span>
          <span className="response-time">200 ms</span>
        </div>
        <div>Content-Type: application/json</div>
        <div>Content-Length: 1024 bytes</div>
        <pre className="response-content">
            
          {/* JSON response would go here */}
          {JSON.stringify({
  "id": "1234",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-04-01T12:00:00Z"
})}
        </pre>
      </div>
    )
  }

export default ResponseBox