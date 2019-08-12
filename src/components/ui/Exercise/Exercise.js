import React from 'react'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {bindActionCreators} from "redux";
import {removeExercise} from "../../../store/actions/exercise.action";
import {connect} from "react-redux";
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

    function handleClick() {
        props.removeExercise(props.exercise.name)
    }

    return (
        <li className="exercise">
            {displayName()}
            <button onClick={handleClick}>
                <IoMdRemoveCircleOutline
                    className="remove-circle"/>
            </button>
        </li>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({removeExercise}, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(Exercise)
