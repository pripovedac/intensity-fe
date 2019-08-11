import React from 'react'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import {IoIosCheckmarkCircleOutline} from 'react-icons/io'
import '../../styles/form-styles/FormStyles.scss'

function ExerciseForm() {

    function handleInput() {
        // todo
    }

    return (
        <div className="training-form">
            <h1>Intense exercise</h1>
            <form>
                <LabeledInput
                    label="Name"
                    type="text"
                    handleInput={handleInput}
                />

                <LabeledInput
                    type="number"
                    label="Reps"
                    handleInput={handleInput}/>

                <LabeledInput
                    type="number"
                    label="Weight"
                    handleInput={handleInput}/>

                <LabeledInput
                    type="number"
                    label="Duration"
                    handleInput={handleInput}/>

                <button type="submit">
                    <IoIosCheckmarkCircleOutline
                        className="checkmark"/>
                </button>
            </form>
        </div>
    )
}

export default ExerciseForm
