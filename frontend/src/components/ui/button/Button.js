import React from 'react'
import './Button.scss'

function Button(props) {

    function handleClick() {
        console.log('hello, button')
    }

    return (
        <button onClick={handleClick}>
            {props.children}
        </button>
    )
}

export default Button
