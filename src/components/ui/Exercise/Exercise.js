import React from 'react'
import {useDispatch} from 'react-redux'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {removeNewExercise} from '../../../store/actions/exercise.action'
import './Exercise.scss'

export default function Exercise(props) {
    const dispatch = useDispatch()

    
    function wrapInLink() {
        const link = props.exercise.link
        if (link)
            return(
                <a href={link}
                   target="_blank">
                    {displayExerciseData()}
                </a>
            )
        else
            return displayExerciseData()
    }
    
    function displayExerciseData() {
        const exercise = props.exercise
        //todo: see if this can be do better

        if (exercise.repsNumber && !exercise.duration && !exercise.weight)
            return `${exercise.name} for ${exercise.repsNumber} reps`

        else if (!exercise.repsNumber && exercise.weight && !exercise.duration)
            return `${exercise.name}, ${exercise.weight} kilos`

        else if (!exercise.repsNumber && !exercise.weight && exercise.duration)
            return `${exercise.name} for ${exercise.duration} mins`

        else if (exercise.repsNumber && !exercise.duration && exercise.weight)
            return `${exercise.name} for ${exercise.repsNumber} reps, ${exercise.weight} kilos`

        else if (exercise.repsNumber && !exercise.weight && exercise.duration)
            return `${exercise.duration} mins of ${exercise.name} for ${exercise.repsNumber} reps`

        else if (!exercise.repsNumber && exercise.weight && exercise.duration)
            return `${exercise.duration} mins of ${exercise.name}, ${exercise.weight} kilos`

        else if (exercise.repsNumber && exercise.weight && exercise.duration)
            return `${exercise.duration} mins of ${exercise.name} for ${exercise.repsNumber} reps, ${exercise.weight} kilos`

        else
            return exercise.name
    }

    function displayRemoveButton() {
        if (props.mode !== 'regular') {
            return (
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
            {wrapInLink()}
            {displayRemoveButton()}
        </li>
    )
}
