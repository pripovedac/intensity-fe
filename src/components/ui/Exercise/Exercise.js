import React from 'react'
import {useDispatch} from 'react-redux'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {removeNewExercise} from '../../../store/actions/exercise.action'
import './Exercise.scss'

export default function Exercise(props) {
    const dispatch = useDispatch()

    function displayExerciseData() {
        const exercise = props.exercise
        //todo: see if this can be do better
        if (!exercise.duration && exercise.weight)
            return `${exercise.name} for ${exercise.repsNumber} reps, ${exercise.weight} kilos`
        else if (exercise.duration && !exercise.weight)
            return `${exercise.duration} mins of ${exercise.name} for ${exercise.repsNumber} reps`
        else if (exercise.duration && exercise.weight)
            return `${exercise.duration} mins of ${exercise.name} for ${exercise.repsNumber} reps, ${exercise.weight} kilos`
        else if (exercise.duration && !exercise.weight && !exercise.reps)
            return `${exercise.duration} mins of ${exercise.name}`
        else
            return exercise.name
    }

    function displayRemoveButton() {
        if (props.mode !== 'regular') {
            return(
                <button onClick={handleClick}>
                    <IoMdRemoveCircleOutline
                        className="remove-circle"/>
                </button>
            )
        }
    }

    function handleClick() {
        dispatch(removeNewExercise(props.exercise.name))
    }

    return (
        <li className="exercise">
            {displayExerciseData()}
            {displayRemoveButton()}
        </li>
    )
}
