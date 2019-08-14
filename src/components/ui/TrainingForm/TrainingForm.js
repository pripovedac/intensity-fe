import React, {useState} from 'react'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import RadioButton from '../Input/RadioButton/RadioButton'
import SelectInput from '../Input/SelectInput/SelectInput'
import {FaCheckCircle} from 'react-icons/fa'
import '../../styles/form-styles/FormStyles.scss'
import {bindActionCreators} from 'redux'
import {addWod} from '../../../store/actions/wod.action'
import {connect} from 'react-redux'
import {setExerciseMode} from '../../../store/actions/global.action'

function TrainingForm(props) {
    const [globalType, setGlobaltype] = useState('crossfit')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [duration, setDuration] = useState('')
    const [roundNumber, setRounds] = useState('')

    // todo: this should be taken from DB
    const trainingOptions = ['custom', 'emom', 'amrap',
        'rft', 'chipper', 'ladder', 'tabata']
    const [trainingType, setTrainingType] = useState(trainingOptions[0])

    // todo: this should be taken from DB
    const trainerOptions = ['Dusan Arandjelovic', 'Milan Spasic', 'Nemanja Sutanovac']
    const [trainer, setTrainer] = useState(trainerOptions[0])

    function handleSubmit(event) {
        event.preventDefault()
        if (checkForm()) {
            const wod = createWod()
            props.addWod(wod)
            props.setExerciseMode()
        } else {
            alert('WOD is not intense if it does not have a name.')
        }
    }

    function checkForm() {
        return name.trim().length
    }

    function createWod() {
        return {
            globalType,
            name,
            date,
            duration,
            roundNumber,
            trainer,
            trainingType,
        }
    }

    return (
        <div className="training-form">
            <h1>Workout of the Day</h1>
            <form onSubmit={handleSubmit}>
                <div className="radio-container">
                    <p>WOD</p>
                    <RadioButton
                        name="training-type"
                        value="type"
                        label="Crossfit"
                        checked
                        handleInput={setGlobaltype}
                    />
                    <RadioButton
                        name="training-type"
                        value="type"
                        label="Lightfit"
                        checked={false}
                        handleInput={setGlobaltype}
                    />
                </div>

                <LabeledInput
                    label="Name"
                    type="text"
                    placeholder="Dangerous name"
                    handleInput={setName}
                />

                <LabeledInput
                    type="date"
                    label="Date"
                    handleInput={setDate}/>

                <LabeledInput
                    type="number"
                    label="Duration"
                    placeholder="0"
                    handleInput={setDuration}/>

                <LabeledInput
                    type="number"
                    label="Rounds"
                    placeholder="0"
                    handleInput={setRounds}/>

                <SelectInput className="custom-input"
                             label="Training type"
                             options={trainingOptions}
                             handleInput={setTrainingType}/>

                <SelectInput className="custom-input"
                             label="Trainer"
                             options={trainerOptions}
                             handleInput={setTrainer}/>

                <button type="submit">
                    <FaCheckCircle
                        className="checkmark"/>
                </button>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addWod,
            setExerciseMode
        }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(TrainingForm)
