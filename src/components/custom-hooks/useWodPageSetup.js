import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import queryString from 'query-string'
import {calculateDate} from '../../services/dates'
import {getTraining} from '../../services/api/training'
import {
    addActiveTraining,
    removeActiveTraining,
    removeUpdateNotification,
    setRegularMode
} from '../../store/actions/global.action'
import {addActiveWod, cleanNewWod, removeActiveWod} from '../../store/actions/wod.action'
import {addActiveExercises, cleanNewExercises, removeActiveExercises} from '../../store/actions/exercise.action'
import removeLoadingState from '../../services/timeout'

export default function useWodPageSetup(search) {
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
            console.log('Cleaning...')
            dispatch(removeActiveTraining())
            dispatch(removeActiveWod())
            dispatch(removeActiveExercises())
            dispatch(cleanNewWod())
            dispatch(cleanNewExercises())
            dispatch(removeUpdateNotification())
            dispatch(setRegularMode())
        }

        fetchTraining(search)
        removeLoadingState(setLoading)

        return cleanRedux
    }, [search, dispatch])

    return loading
}
