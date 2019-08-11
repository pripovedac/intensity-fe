import React from 'react'
import './RadioButton.scss'

function RadioButton(props) {

    function handleInput(event) {
        // const text = event.target.value
        // props.handleInput(text)
    }

    return (

            <label className="radio-button">
                <input
                    type="radio"
                    name={props.name}
                    value={props.value}
                    onChange={handleInput}
                />

                {props.label}
            </label>

    )
}

export default RadioButton
