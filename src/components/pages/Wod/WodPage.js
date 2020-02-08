import React from 'react'
import useWodPageSetup from '../../custom-hooks/useWodPageSetup'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import CompleteWod from '../../ui/CompleteWod/CompleteWod'
import WodTypePicker from '../../ui/WodTypePicker/WodTypePicker'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import ButtonWithText from '../../ui/Button/ButtonWithText/ButtonWithText'
import LoadingState from '../../loading-state/LoadingState'
import {submitWod, updateWod} from '../../../store/actions/wod.action'
import {selectMode, selectUpdateNotification} from '../../../store/selectors/global.selector'
import {selectNewWodWithExercises} from '../../../store/selectors/wod.selector'
import {calculateDate} from '../../../services/dates'
import {globalTypes, trainingTypes} from '../../../services/enums'
import queryString from 'query-string'
import Hulk from './hulk.jpg'
import './WodPage.scss'

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
        if (mode === 'no-selected') {
            return <WodTypePicker history={history}/>
        } else if (mode === 'regular') {
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
        console.log('Submitting code, ma boi!')
        if (isUpdate) {
            console.log("Update")
            const queryParams = queryString.parse(search)
            // wodWithExercises.date = calculateDate(queryParams)
            const date =  calculateDate(queryParams)
            wodWithExercises.date = new Date(date).toISOString()
            const adjustedWod = adjustWod(wodWithExercises)
            dispatch(updateWod(adjustedWod))
        } else {
            console.log('Creating')
            delete wodWithExercises.id
            // console.log('Wod with exercises: ', wodWithExercises)
            const adjustedWod = adjustWod(wodWithExercises)
            // console.log('Adjusted: ', adjustedWod)
            dispatch(submitWod(adjustedWod))
        }
    }

    function copyObject (object) {
        return JSON.parse(JSON.stringify(object))
    }

    function adjustWod() {
        const wodCopy = copyObject(wodWithExercises)
        // console.log('wod copy: ', wodCopy)
        // console.log('trainingType: ', trainingTypes[wodCopy.trainingType])

        const exercisesCopy = wodCopy.exercises.map(exercise => {
            // delete exercise.link

            return {
                ...exercise,
                repsNumber: parseInt(exercise.repsNumber),
                weight: parseInt(exercise.weight),
                duration: parseInt(exercise.duration),
            }
            // console.log('exercise: ', exercise)
            // delete exercise.link
            // console.log('exercise after: ', exercise)
            // return exercise
        });
        // console.log('Exercise copy: ', exercisesCopy)

        return {
            ...wodCopy,
            duration: parseInt(wodCopy.duration),
            date: new Date(wodCopy.date).toISOString(),
            roundNumber: parseInt(wodCopy.roundNumber),
            globalType: globalTypes[wodCopy.globalType],
            trainingType: trainingTypes[wodCopy.trainingType],
            exercises: exercisesCopy
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
