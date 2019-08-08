import React from 'react'
import './LabeledInput.scss'

function LabeledInput(props) {

    function handleInput(event) {
        const text = event.target.value
        props.handleInput(text)
    }

    return (
        <div className="labeled-input">
            <label>
                {props.label}
                <input
                    value={props.value}
                    type={props.type}
                    onChange={handleInput}
                />
            </label>
        </div>
    )
}

export default LabeledInput
