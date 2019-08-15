import React from 'react'
import {IoMdRemoveCircleOutline} from 'react-icons/io'
import {bindActionCreators} from "redux";
import {removeNewExercise} from "../../../store/actions/exercise.action";
import {connect} from "react-redux";
import './Exercise.scss'

function Exercise(props) {
    function displayExerciseData() {
        const exercise = props.exercise
        //todo: see if this can be do better
        if (!exercise.duration && exercise.weight)
            return `${exercise.name} for ${exercise.reps} reps, ${exercise.weight} kilos`
        else if (exercise.duration && !exercise.weight)
            return `${exercise.duration} mins of ${exercise.name} for ${exercise.reps} reps`
        else if (exercise.duration && exercise.weight)
            return `${exercise.duration} mins of ${exercise.name} for ${exercise.reps} reps, ${exercise.weight} kilos`
        else if (exercise.duration && !exercise.weight && !exercise.reps)
            return `${exercise.duration} mins of ${exercise.name}`
        else
            return exercise.name
    }

    function displayRemoveButton() {
        if (props.mode != 'regular') {
            return(
                <button onClick={handleClick}>
                    <IoMdRemoveCircleOutline
                        className="remove-circle"/>
                </button>
            )
        }
    }

    function handleClick() {
        props.removeNewExercise(props.exercise.name)
    }

    return (
        <li className="exercise">
            {displayExerciseData()}
            {displayRemoveButton()}
        </li>
    )
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({removeNewExercise}, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(Exercise)
