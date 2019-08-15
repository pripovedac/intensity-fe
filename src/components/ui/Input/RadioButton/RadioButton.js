import React from 'react'
import './RadioButton.scss'

function RadioButton(props) {
    function handleInput(event) {
        const value = event.target.value
        props.handleInput(value)
    }

    return (
        <label className="radio-button">
            <input
                type="radio"
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={handleInput}
            />
            {props.label}
        </label>
    )
}

export default RadioButton
