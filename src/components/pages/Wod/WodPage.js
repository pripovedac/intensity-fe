import React from 'react'
import useWodPageSetup from '../../custom-hooks/useWodPageSetup'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import CompleteWod from '../../ui/CompleteWod/CompleteWod'
import ButtonWithText from '../../ui/Button/ButtonWithText/ButtonWithText'
import LoadingState from '../../loading-state/LoadingState'
import {calculateDate} from '../../../services/dates'
import queryString from 'query-string'
import {setWodMode} from '../../../store/actions/global.action'
import {submitWod, updateWod} from '../../../store/actions/wod.action'
import {selectMode, selectUpdateNotification} from '../../../store/selectors/global.selector'
import {selectNewWodWithExercises} from '../../../store/selectors/wod.selector'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './WodPage.scss'

function WodPage(props) {
    console.log('Rendering Wod Page.')
    const {search} = props.location
    const loading = useWodPageSetup(search)

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

    if (!loading) {
        return (
            <div className="wod-container">
                <div className="hulk-container">
                    <img src="./images/hulk.jpg"
                         alt="Hulk"
                         width={300}/>
                </div>
                {displayContent()}
            </div>
        )
    } else {
        return (
            <div className="wod-page">
                <LoadingState/>
            </div>
        )
    }
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
