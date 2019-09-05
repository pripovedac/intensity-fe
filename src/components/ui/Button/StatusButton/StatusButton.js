import React from 'react'
import './StatusButton.scss'

export default function StatusButton(props) {
    return (
        <button
            className={`status-button ${props.class}`}
            type={props.type}
            onClick={props.onClick}>
            {props.text}
        </button>
    )
}
