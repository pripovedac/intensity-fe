import React from 'react'
import Exercise from '../Exercise/Exercise'
import {selectName} from '../../../store/selectors/auth.selector'
import {selectMode} from '../../../store/selectors/global.selector'
import {connect} from 'react-redux'
import './ExerciseList.scss'

function ExerciseList(props) {
    function displayExercises() {
        if (props.exercises.length) {
            return props.exercises.map(e => {
                return <Exercise
                    exercise={e}
                    key={e.name}
                    mode={props.mode}
                />
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
        name: selectName(state),
        mode: selectMode(state)
    }
}

export default connect(
    mapStateToProps
)(ExerciseList)

