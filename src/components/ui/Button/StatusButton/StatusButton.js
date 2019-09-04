import React from 'react'
import './StatusButton.scss'

function StatusButton(props) {
    return (
        <button
            className={`status-button ${props.class}`}
            type={props.type}
            onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default StatusButton
