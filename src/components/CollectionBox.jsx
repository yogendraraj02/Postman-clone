import React from 'react'

function CollectionBox() {
    return (
      <div className=' box-shadow right-panel'>
        <h2 className="request-title">Collections</h2>
        <p className="request-subtitle">Manage your API collections</p>
        <div className="collection-item">
          <span className="collection-icon">📁</span>
          E-commerce API
        </div>
        <div className="collection-item">
          <span className="collection-icon">📁</span>
          Social Media API
        </div>
        <div className="collection-item">
          <span className="collection-icon">📁</span>
          Finance API
        </div>
      </div>
    )
  }

export default CollectionBox