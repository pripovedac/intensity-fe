import React from 'react'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import Navigation from '../../ui/Navigation/Navigation.js'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import CompleteWod from '../../ui/CompleteWod/CompleteWod'
import {bindActionCreators} from 'redux'
import {setWodMode} from '../../../store/actions/global.action'
import {submitWod} from '../../../store/actions/wod.action'
import {connect} from 'react-redux'
import {selectMode} from '../../../store/selectors/global.selector'
import {selectNewWodWithExercises} from '../../../store/selectors/wod.selector'
import './Wod.scss'

function WodPage(props) {
    function displayContent() {
        // todo: Think about using MAP object.
        if (props.mode === 'regular') {
            return <CompleteWod />
        } else if (props.mode === 'wod') {
            return <TrainingForm/>
        } else if (props.mode === 'exercise') {
            return (
                <div className="exercise-page">
                    <div className="exercise-container">
                        <ExerciseForm/>
                        <ExerciseList exercises={props.wodWithExercises.exercises}/>
                    </div>
                    <button
                        disabled={!props.wodWithExercises.exercises.length}
                        onClick={submitWod}>
                        Submit complete WOD
                    </button>
                </div>
            )
        }
    }

    function submitWod() {
        props.submitWod(props.wodWithExercises)
    }

    return (
        <div className="wod-page">
            <Navigation/>
            <div className="wod-container">
                <div className="hulk-container">
                    <img src="./images/hulk.jpg"
                         alt="Hulk"
                         width={300}/>
                </div>
                {displayContent()}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        mode: selectMode(state),
        wodWithExercises: selectNewWodWithExercises(state),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setWodMode,
            submitWod
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WodPage)
