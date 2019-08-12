import React from 'react'
import {IoIosFlash} from 'react-icons/io'
import './Exercise.scss'

function Exercise(props) {
    function displayName() {
        const exercise = props.exercise
        //todo: see if this can be do better
        if (!exercise.duration && exercise.weight)
            return `${exercise.name} - for ${exercise.reps} reps, ${exercise.weight} kilos`
        else if (exercise.duration && !exercise.weight)
            return `${exercise.duration} mins of:\n ${exercise.name} - for ${exercise.reps} reps`
        else if (exercise.duration && exercise.weight)
            return `${exercise.duration} mins of:\n ${exercise.name} - for ${exercise.reps} reps, ${exercise.weight} kilos`
        else if (exercise.duration && !exercise.weight && !exercise.reps)
            return `${exercise.duration} mins of:\n ${exercise.name}`
    }

    return (
        <li className="exercise">
            {displayName()}
        </li>
    )
}

export default Exercise
