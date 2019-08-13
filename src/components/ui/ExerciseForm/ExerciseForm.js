import React, {useState} from 'react'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import {FaArrowAltCircleLeft, FaCheckCircle} from 'react-icons/fa'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addExercise} from '../../../store/actions/exercise.action'
import {setWodMode} from '../../../store/actions/global.action'
import '../../styles/form-styles/FormStyles.scss'
import './ExerciseForm.scss'

function ExerciseForm(props) {
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [duration, setDuration] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (checkForm()) {
            const exercise = createExercise()
            props.addExercise(exercise)
            resetFields()

        } else {
            alert('Exercise is not intense if it does not have a name.')
        }
    }

    function checkForm() {
        return name.trim().length
    }

    function createExercise() {
        return {
            name,
            reps,
            weight,
            duration
        }
    }

    function resetFields() {
        setName('')
        setReps('')
        setWeight('')
        setDuration('')
    }

    return (
        <div className="training-form">
            <h1>Intense exercise</h1>
            <form onSubmit={handleSubmit}>
                <LabeledInput
                    label="Name"
                    type="text"
                    value={name}
                    placeholder="Simple name"
                    handleInput={setName}
                />

                <LabeledInput
                    type="number"
                    label="Reps"
                    value={reps}
                    placeholder="1"
                    handleInput={setReps}/>

                <LabeledInput
                    type="number"
                    label="Weight"
                    value={weight}
                    placeholder="0"
                    handleInput={setWeight}/>

                <LabeledInput
                    type="number"
                    label="Duration"
                    value={duration}
                    placeholder="0"
                    handleInput={setDuration}/>

                <div className="button-container">
                    <button onClick={props.setWodMode}>
                        <FaArrowAltCircleLeft className="checkmark"/>
                    </button>

                    <button className="exercise-button"
                            type="submit">
                        <FaCheckCircle
                            className="checkmark"/>
                    </button>
                </div>

            </form>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addExercise,
            setWodMode
        }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(ExerciseForm)
