import React, {useState, useEffect} from 'react'
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
import {
    setWodMode,
    addActiveTraining,
    removeActiveTraining,
    setRegularMode,
    removeUpdateNotification
} from '../../../store/actions/global.action'
import {submitWod, addActiveWod, removeActiveWod, cleanNewWod, updateWod} from '../../../store/actions/wod.action'
import {addActiveExercises, removeActiveExercises, cleanNewExercises} from '../../../store/actions/exercise.action'
import {selectMode, selectUpdateNotification} from '../../../store/selectors/global.selector'
import {selectNewWodWithExercises} from '../../../store/selectors/wod.selector'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'
import './Wod.scss'

function WodPage(props) {
    const [search] = useState(props.location.search)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Effect running!')

        async function fetchTraining(search) {
            const queryParams = queryString.parse(search)
            // todo: This was necessary as the hours would be lost.
            // todo: Should be found better way, or, preferably,
            // todo: remove updating the date.
            const date = calculateDate(queryParams)
            const training = await getTraining(date)
            if (!training.errorStatus) {
                // re-renders!
                updateRedux(training)
            }
        }

        function updateRedux(training) {
            dispatch(addActiveTraining(training.id))
            const wodPayload = {
                ...training.wod,
                members: training.members
            }
            dispatch(addActiveWod(wodPayload))
            dispatch(addActiveExercises(training.exercises))
        }


        function cleanRedux() {
            dispatch(removeActiveTraining())
            dispatch(removeActiveWod())
            dispatch(removeActiveExercises())
            dispatch(cleanNewWod())
            dispatch(cleanNewExercises())
            dispatch(removeUpdateNotification())
            dispatch(setRegularMode())
        }

        fetchTraining(search)
        return cleanRedux
    }, [search, dispatch])

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
        if (props.isUpdate) {
            const queryParams = queryString.parse(search)
            props.wodWithExercises.date = calculateDate(queryParams)
            props.updateWod(props.wodWithExercises)
        } else {
            delete props.wodWithExercises.id
            props.submitWod(props.wodWithExercises)
        }
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
        isUpdate: selectUpdateNotification(state)
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setWodMode,
            submitWod,
            updateWod
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WodPage)
