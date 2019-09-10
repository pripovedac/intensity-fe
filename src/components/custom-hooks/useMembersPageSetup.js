import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getAllMembers} from '../../services/api/user'
import {useSelectorWrapper} from './useReduxHooks'
import {setMembers} from '../../store/actions/members.action'
import {selectMembersLength} from '../../store/selectors/members.selector'
import removeLoadingState from '../../services/timeout'

export default function useMembersPageSetup() {
    const membersNumber = useSelectorWrapper(selectMembersLength)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchAllMembers() {
            setLoading(true)
            const members = await getAllMembers()
            if (members) {
                updateRedux(members)
            }

            removeLoadingState(setLoading, 200)
        }

        function updateRedux(members) {
            dispatch(setMembers(members))
        }

        fetchAllMembers()

    }, [dispatch, membersNumber])

    return loading
}
