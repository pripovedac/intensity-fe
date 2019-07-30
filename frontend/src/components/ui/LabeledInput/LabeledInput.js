import React from 'react'
import './LabeledInput.scss'

function LabeledInput(props) {
    function handleInput(e) {
        console.log('input changed: ', e.target.value)
    }

    return(
        <div className="labeled-input">
            <span>
                {props.label}
            </span>
            <input
                type={props.type}
                onInput={handleInput}
            />
        </div>
    )
}

export default LabeledInput
