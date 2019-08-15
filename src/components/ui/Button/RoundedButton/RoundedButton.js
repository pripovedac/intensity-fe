import React from 'react'
import './RoundedButton.scss'

function RoundedButton(props) {
    return (
        <button
            className="rounded-button"
            type={props.type}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default RoundedButton
