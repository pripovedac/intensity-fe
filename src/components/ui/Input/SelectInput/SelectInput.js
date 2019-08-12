import React from 'react'
import './SelectInput.scss'

function SelectInput(props) {
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

    return (
        <label className="select-input">
            {props.label}
            <select>
                {displayOptions()}
            </select>
        </label>
    )
}

export default SelectInput
