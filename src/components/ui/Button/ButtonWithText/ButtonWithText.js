import React from 'react'
import './ButtonWithText.scss'

function ButtonWithText(props) {
    function handleClick() {
        props.onClick()
    }

    return (
        <button
            className="text-button"
            disabled={props.disabled}
            onClick={handleClick}>
            {props.children}
        </button>
    )
}

export default ButtonWithText
