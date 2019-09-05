import React from 'react'
import './ButtonWithText.scss'

export default function ButtonWithText(props) {
    return (
        <button
            className="text-button"
            disabled={props.disabled}
            onClick={ props.onClick}>
            {props.children}
        </button>
    )
}
