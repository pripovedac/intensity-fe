import React from 'react'
import './RoundedButton.scss'

function RoundedButton(props) {
    return (
        <button
            className="rounded-button"
            type={props.type}>
            {props.children}
        </button>
    )
}

export default RoundedButton
