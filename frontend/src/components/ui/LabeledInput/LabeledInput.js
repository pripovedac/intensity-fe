import React from 'react'
import './LabeledInput.scss'

function LabeledInput(props) {
    function handleInput(e) {
        console.log('input changed: ', e.target.value)
    }

    return (
        <div className="labeled-input">
            <label>
                {props.label}
                <input
                    type={props.type}
                    onInput={handleInput}
                />
            </label>
        </div>
    )
}

export default LabeledInput
