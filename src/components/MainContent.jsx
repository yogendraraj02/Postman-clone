import React from 'react'
import RequestBox from './RequestBox';
import ResponseBox from './ResponseBox';
import HistoryBox from './HistoryBox';
import CollectionBox from './CollectionBox';
function MainContent({isAuthenticated}) {
    return (
      <div className="main-content">
        <div className="request-response-area">
          <RequestBox />
          <ResponseBox />
        </div>
        {isAuthenticated && <div className="side-panel">
          <HistoryBox />
          <CollectionBox />
        </div>}
      </div>
    )
  }

export default MainContent