import React from 'react'
import './SelectInput.scss'

export default function SelectInput(props) {
    function displayOptions() {
        const options = props.options
        return options.map(option => {
            return (
                <option value={option}
                        key={option}>
                    {option}
                </option>
            )
        })
    }

    function handleChange(event) {
        const value = event.target.value
        props.handleInput(value)
    }

    return (
        <label className="select-input">
            {props.label}
            <select
                value={props.value}
                onChange={handleChange}>
                {displayOptions()}
            </select>
        </label>
    )
}
