import React from 'react'
import Exercise from '../Exercise/Exercise'
import {connect} from 'react-redux'
import {selectExercises} from '../../../store/selectors/exercise.selector'
import './ExerciseList.scss'
import {selectName} from '../../../store/selectors/auth.selector'

function ExerciseList(props) {
    function displayExercises() {
        if (props.exercises.length) {
            return props.exercises.map(e => {
                return <Exercise
                    exercise={e}
                    key={e.name}/>
            })
        } else {
            return <p>{`${props.name}, you haven't added any exercises yet.
            Fill in the intense form for today's wod.`}</p>
        }
    }

    return (
        <div className="exercise-list">
            <h1>Exercise list</h1>
            <ul>
                {displayExercises()}
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        exercises: selectExercises(state),
        name: selectName(state)
    }
}

export default connect(
    mapStateToProps
)(ExerciseList)

