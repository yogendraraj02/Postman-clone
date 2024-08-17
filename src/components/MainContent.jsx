import React, { useState } from 'react'
import RequestBox from './RequestBox';
import ResponseBox from './ResponseBox';
import HistoryBox from './HistoryBox';
import CollectionBox from './CollectionBox';
function MainContent({isAuthenticated}) {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const handleResponse = (responseData) => {
      setResponse(responseData)
      setError(null)
    }
  
    const handleError = (errorData) => {
      setError(errorData)
      setResponse(null)
    }

    return (
      <div className="main-content">
        <div className="request-response-area">
          <RequestBox onResponse={handleResponse} onError={handleError} />
          <ResponseBox response={response} error={error} />
        </div>
        {isAuthenticated && <div className="side-panel">
          <HistoryBox />
          <CollectionBox />
        </div>}
      </div>
    )
  }

export default MainContent