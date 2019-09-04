import React from 'react'
import './LabeledInput.scss'

function LabeledInput(props) {
    return (
        <label className="labeled-input">
            {props.label}
            <input
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </label>
    )
}

export default LabeledInput
