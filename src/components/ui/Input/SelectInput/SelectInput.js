import React from 'react'
import './SelectInput.scss'

function SelectInput(props) {

    function handleInput(event) {
        // const text = event.target.value
        // props.handleInput(text)
    }

    return (
        <label className="select-input">
            {props.label}
           <select>
               <option value="custom">custom</option>
               <option value="amrap">amrap</option>
               <option value="emom">emom</option>
               <option value="rft">rft</option>
               <option value="chipper">chipper</option>
               <option value="ladder">ladder</option>
               <option value="tabata">tabata</option>
           </select>
        </label>
    )
}

export default SelectInput
