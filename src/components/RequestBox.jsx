import React from 'react'

function RequestBox() {
    return (
      <div className="request-box box-shadow">
        <h2 className="request-title">New Request</h2>
        <p className="request-subtitle">Create a new API request</p>
        <div className="request-form">
          <div className="form-group">
            <label className="form-label">Method</label>
            <select className="form-input">
              <option>GET</option>
              {/* Add other HTTP methods */}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">URL</label>
            <input type="text" className="form-input" placeholder="https://api.example.com/v1/users" />
          </div>
          <div className="form-group">
            <label className="form-label">Body</label>
            <textarea className="form-input" rows="4" placeholder="Enter request body"></textarea>
          </div>
          <div className="submit-btn-group">
            <button className="button button-primary">Send</button>
            <button className="button">Cancel</button>
          </div>
        </div>
      </div>
    )
  }
export default RequestBox