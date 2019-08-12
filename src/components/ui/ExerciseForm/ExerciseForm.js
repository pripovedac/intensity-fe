import React, {useState} from 'react'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import {IoIosCheckmarkCircleOutline} from 'react-icons/io'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addExercise} from '../../../store/actions/exercise.action'
import '../../styles/form-styles/FormStyles.scss'

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
        setReps('1')
        setWeight('0')
        setDuration('0')
        console.log('reset')
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

                <button className="exercise-button"
                        type="submit">
                    <IoIosCheckmarkCircleOutline
                        className="checkmark"/>
                </button>
            </form>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({addExercise}, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(ExerciseForm)
