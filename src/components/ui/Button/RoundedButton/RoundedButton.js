import React from 'react'
import './RoundedButton.scss'

export default function RoundedButton(props) {
    return (
        <button
            className="rounded-button"
            type={props.type}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

