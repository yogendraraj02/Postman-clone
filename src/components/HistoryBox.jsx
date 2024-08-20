import React from 'react'

function HistoryBox() {
    return (
      <div className="history-box box-shadow right-panel">
        <h2 className="request-title">History</h2>
        <p className="request-subtitle">View your request history</p>
        <p>This feature is under development</p>
        {/* <div className="history-item">
          <span className="history-method">GET</span>
          <span className="history-path">/api/users</span>
          <span className="history-time">2 min ago</span>
        </div> */}
        {/* Add more history items */}
      </div>
    )
  }

export default HistoryBox
