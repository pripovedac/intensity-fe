import React from 'react'
import './Button.scss'

function Button(props) {
    return (
        <button
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default Button
