import React, {useState} from 'react'
import useInput from '../../custom-hooks/useInput'
import LabeledInput from '../Input/LabeledInput/LabeledInput'
import RoundedButton from '../Button/RoundedButton/RoundedButton'
import {FaArrowAltCircleLeft, FaCheckCircle} from 'react-icons/fa'
import {addNewExercise} from '../../../store/actions/exercise.action'
import {setWodMode} from '../../../store/actions/global.action'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../../styles/form-styles/FormStyles.scss'
import './ExerciseForm.scss'

function ExerciseForm(props) {
    const {
        value: name,
        resetValue: resetName,
        bind: bindName,
    } = useInput('bench')

    const {
        value: repsNumber,
        resetValue: resetReps,
        bind: bindReps,
    } = useInput('')

    const {
        value: weight,
        resetValue: resetWeight,
        bind: bindWeight,
    } = useInput('')

    const {
        value: duration,
        resetValue: resetDuration,
        bind: bindDuration
    } = useInput('')


    function handleSubmit(event) {
        event.preventDefault()

        if (checkForm()) {
            const exercise = createExercise()
            const validatedExercise = validateExercise(exercise)
            props.addNewExercise(validatedExercise)
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
            repsNumber,
            weight,
            duration
        }
    }

    function validateExercise(exercise) {
        let validatedExercise
        validatedExercise = validateProperty(exercise, 'repsNumber')
        validatedExercise = validateProperty(exercise, 'weight')
        validatedExercise = validateProperty(exercise, 'duration')
        return validatedExercise
    }

    // todo: see how to extract this function using hooks
    // same function in this and TrainingForm components
    function validateProperty(exercise, property) {
        if (!exercise[property]) {
            exercise[property] = 0
        }
        return exercise
    }

    function resetFields() {
        console.log('name: ', name)
        console.log('resetName: ', resetName)
        console.log('bindName: ', bindName)
        resetName()
        resetReps()
        resetWeight()
        resetDuration()
    }

    return (
        <div className="training-form">
            <h1>Intense exercise</h1>
            <form onSubmit={handleSubmit}>
                <LabeledInput
                    label="Name"
                    type="text"
                    placeholder="Simple name"
                    {...bindName}/>

                <LabeledInput
                    type="number"
                    label="Reps"
                    placeholder="1"
                    {...bindReps}/>

                <LabeledInput
                    type="number"
                    label="Weight"
                    placeholder="0"
                    {...bindWeight}/>

                <LabeledInput
                    type="number"
                    label="Duration"
                    placeholder="0"
                    {...bindDuration}/>

                <div className="button-container">

                    <RoundedButton
                        onClick={props.setWodMode}>
                        <FaArrowAltCircleLeft
                            className="button-icon"/>
                    </RoundedButton>

                    <RoundedButton>
                        <FaCheckCircle
                            type="submit"
                            className="button-icon"/>
                    </RoundedButton>

                </div>
            </form>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addNewExercise,
            setWodMode
        }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(ExerciseForm)
