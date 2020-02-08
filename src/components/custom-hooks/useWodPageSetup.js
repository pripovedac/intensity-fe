import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import queryString from 'query-string'
import {getTraining} from '../../services/api/training'
import {
    addActiveTraining,
    removeActiveTraining,
    removeUpdateNotification,
    setRegularMode,
    setNoSelectedMode,
} from '../../store/actions/global.action'
import {addActiveWod, cleanNewWod, removeActiveWod} from '../../store/actions/wod.action'
import {addActiveExercises, cleanNewExercises, removeActiveExercises} from '../../store/actions/exercise.action'
import {calculateDate} from '../../services/dates'
import removeLoadingState from '../../services/timeout'

export default function useWodPageSetup(search, history) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('Effect running!')
        setLoading(true)

        async function fetchTraining(search) {
            const queryParams = queryString.parse(search)
            // todo: This was necessary as the hours would be lost.
            // todo: Should be found better way, or, preferably,
            // todo: remove updating the date.
            const date = calculateDate(queryParams)
            const training = await getTraining(date)
            console.log('training: ', training)
            if (!training.errorStatus) {
                console.log('no error')
                updateRedux(training)
            }
            console.log('done')

        }

        function updateRedux(training) {
            dispatch(addActiveTraining(training.id))
            const wodPayload = {
                ...training.wod,
                users: training.users
            }
            dispatch(addActiveWod(wodPayload))
            dispatch(addActiveExercises(training.wod.exercises))
        }

        function cleanRedux() {
            console.log('Cleaning...')
            dispatch(removeActiveTraining())
            dispatch(removeActiveWod())
            dispatch(removeActiveExercises())
            dispatch(cleanNewWod())
            dispatch(cleanNewExercises())
            dispatch(removeUpdateNotification())
            dispatch(setRegularMode())
        }

        if (search) {
            fetchTraining(search)
            removeLoadingState(setLoading, 350)
        } else {
            dispatch(setNoSelectedMode())
            removeLoadingState(setLoading, 200)
        }

        return cleanRedux
    }, [search, history, dispatch])

    return [loading, setLoading]
}
