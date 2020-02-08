import React from 'react'
import './PublicButton.scss'

export default function PublicButton(props) {
    return (
        <button
            className="public-button"
            type={props.type}
            >
            {props.children}
        </button>
    )
}
