import React, {useState} from 'react'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import RadioButton from '../Input/RadioButton/RadioButton'
import SelectInput from '../Input/SelectInput/SelectInput'
import {IoIosCheckmarkCircleOutline} from 'react-icons/io'
import '../../styles/form-styles/FormStyles.scss'

function TrainingForm() {
    const trainingOptions = ['custom', 'emom', 'amrap',
            'rft', 'chipper', 'ladder', 'tabata']
    const [trainingTypes, setTrainingTypes] = useState(trainingOptions)
    const trainerOptions = ['Dusan Arandjelovic', 'Milan Spasic', 'Nemanja Sutanovac']
    const [trainers, setTrainers] = useState(trainerOptions)

    function handleInput() {
        // todo
    }

    return (
        <div className="training-form">
            <h1>Workout of the Day</h1>
            <form>
                <div className="radio-container">
                    <p>WOD</p>
                    <RadioButton
                        name="training-type"
                        value="type"
                        label="Crossfit"
                    />
                    <RadioButton
                        name="training-type"
                        value="type"
                        label="Lightfit"
                    />
                </div>

                <LabeledInput
                    label="Name"
                    type="text"
                    handleInput={handleInput}
                />

                <LabeledInput
                    type="date"
                    label="Date"
                    handleInput={handleInput}/>

                <LabeledInput
                    type="number"
                    label="Duration"
                    handleInput={handleInput}/>

                <LabeledInput
                    type="number"
                    label="Rounds"
                    handleInput={handleInput}/>

                <SelectInput className="custom-input"
                             label="Training type"
                             options={trainingTypes}/>

                <SelectInput className="custom-input"
                             label="Trainer"
                             options={trainers}/>

                <button type="submit">
                    <IoIosCheckmarkCircleOutline
                        className="checkmark"/>
                </button>
            </form>
        </div>
    )
}

export default TrainingForm
