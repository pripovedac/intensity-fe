import React, {useState} from 'react'
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
import Hulk from './hulk.jpg'
import './WodPage.scss'
import {Link} from "react-router-dom";

export default function WodPage(props) {
    const {search} = props.location
    const {history} = props
    const [loading, setLoading] = useWodPageSetup(search, history)
    const mode = useSelectorWrapper(selectMode)
    const wodWithExercises = useSelectorWrapper(selectNewWodWithExercises)
    const isUpdate = useSelectorWrapper(selectUpdateNotification)
    const dispatch = useDispatch()

    function displayContent() {
        // todo: Think about using MAP object.
        if (mode === 'regular') {
            return <CompleteWod setWodLoading={setLoading}/>
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

    function displayHulk() {
            return (
                <Link to={{
                    pathname: '/home',
                }} className="hulk-container">
                    <img src={Hulk} alt="Hulk"/>
                </Link>
            )
    }

    if (!loading) {
        return (
            <div className="wod-container">
                {displayHulk()}
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
