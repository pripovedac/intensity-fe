import React from 'react'
import './OnlyIconButton.scss'

export default function OnlyIconButton(props) {
    return (
        <button
            className="only-icon-button"
            type={props.type}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}
