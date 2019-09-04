import React from 'react'
import ReactLoading from 'react-loading'
import './LoadingState.scss'

function LoadingState() {
    return (
        <div className="loading-container">
            <ReactLoading type={"spin"} color={"#53900f"} className="loading-icon"/>
        </div>
    )
}

export default LoadingState
