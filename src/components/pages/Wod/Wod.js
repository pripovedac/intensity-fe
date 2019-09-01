import React, {useEffect} from 'react'
import {calculateDate} from '../../../services/dates'
import queryString from 'query-string'
import {getTraining} from '../../../services/api/training'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import Navigation from '../../ui/Navigation/Navigation.js'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import CompleteWod from '../../ui/CompleteWod/CompleteWod'
import ButtonWithText from '../../ui/Button/ButtonWithText/ButtonWithText'
import {bindActionCreators} from 'redux'
import {setWodMode, addActiveTraining, removeActiveTraining} from '../../../store/actions/global.action'
import {submitWod, addActiveWod, removeActiveWod} from '../../../store/actions/wod.action'
import {addActiveExercises, removeActiveExercises} from '../../../store/actions/exercise.action'
import {selectMode} from '../../../store/selectors/global.selector'
import {selectNewWodWithExercises} from '../../../store/selectors/wod.selector'
import {connect} from 'react-redux'
import MemberList from '../../ui/MemberList/MemberList'
import './Wod.scss'

function WodPage(props) {
    useEffect(() => {
        console.log('Effect running!')

        async function fetchTraining() {
            const queryParams = queryString.parse(props.location.search)
            const date = calculateDate(queryParams)
            const training = await getTraining(date)
            if (!training.errorStatus) {
                updateRedux(training)
            }
        }

        function updateRedux(training) {
            props.addActiveTraining(training.id)
            props.addActiveWod({
                ...training.wod,
                members: training.members
            })
            props.addActiveExercises(training.exercises)
        }

        function cleanRedux() {
            props.removeActiveTraining()
            props.removeActiveWod()
            props.removeActiveExercises()
        }

        fetchTraining()

        return cleanRedux
    }, [])

    function displayContent() {
        // todo: Think about using MAP object.
        if (props.mode === 'regular') {
            return <CompleteWod/>
        } else if (props.mode === 'wod') {
            return <TrainingForm/>
        } else if (props.mode === 'exercise') {
            return (
                <div className="exercise-page">
                    <div className="exercise-container">
                        <ExerciseForm/>
                        <ExerciseList exercises={props.wodWithExercises.exercises}/>
                    </div>
                    <ButtonWithText
                        disabled={!props.wodWithExercises.exercises.length}
                        onClick={submitWod}>
                        Submit complete WOD
                    </ButtonWithText>
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
                <MemberList/>
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
            submitWod,
            addActiveTraining,
            addActiveWod,
            addActiveExercises,
            removeActiveTraining,
            removeActiveWod,
            removeActiveExercises
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WodPage)
