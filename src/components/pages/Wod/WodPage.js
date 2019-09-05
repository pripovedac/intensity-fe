import React from 'react'
import useWodPageSetup from '../../custom-hooks/useWodPageSetup'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import CompleteWod from '../../ui/CompleteWod/CompleteWod'
import ButtonWithText from '../../ui/Button/ButtonWithText/ButtonWithText'
import LoadingState from '../../loading-state/LoadingState'
import {calculateDate} from '../../../services/dates'
import queryString from 'query-string'
import {submitWod, updateWod} from '../../../store/actions/wod.action'
import {selectMode, selectUpdateNotification} from '../../../store/selectors/global.selector'
import {selectNewWodWithExercises} from '../../../store/selectors/wod.selector'
import './WodPage.scss'

export default function WodPage(props) {
    console.log('Rendering Wod Page.')
    const {search} = props.location
    const loading = useWodPageSetup(search)
    const mode = useSelectorWrapper(selectMode)
    const wodWithExercises = useSelectorWrapper(selectNewWodWithExercises)
    const isUpdate = useSelectorWrapper(selectUpdateNotification)
    const dispatch = useDispatch()

    function displayContent() {
        // todo: Think about using MAP object.
        if (mode === 'regular') {
            return <CompleteWod/>
        } else if (mode === 'wod') {
            return <TrainingForm/>
        } else if (mode === 'exercise') {
            return (
                <div className="exercise-page">
                    <div className="exercise-container">
                        <ExerciseForm/>
                        <ExerciseList exercises={wodWithExercises.exercises}/>
                    </div>
                    <ButtonWithText
                        disabled={!wodWithExercises.exercises.length}
                        onClick={submitWodForm}>
                        Submit complete WOD
                    </ButtonWithText>
                </div>
            )
        }
    }

    function submitWodForm() {
        if (isUpdate) {
            const queryParams = queryString.parse(search)
            wodWithExercises.date = calculateDate(queryParams)
            dispatch(updateWod(wodWithExercises))
        } else {
            delete wodWithExercises.id
            dispatch(submitWod(wodWithExercises))
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
