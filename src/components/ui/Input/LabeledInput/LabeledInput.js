import React from 'react'
import './LabeledInput.scss'

function LabeledInput(props) {

    function handleInput(event) {
        const value = event.target.value
        props.handleInput(value)
    }

    return (
        <label className="labeled-input">
            {props.label}
            <input
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                onChange={handleInput}
            />
        </label>
    )
}

export default LabeledInput
