import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getAllMembers} from '../../services/api/user'
import {setMembers} from '../../store/actions/members.action'

export default function useMembersPageSetup() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        async function fetchAllMembers() {
            const members = await getAllMembers()
            if (members) {
                updateRedux(members)
            }
            setLoading(false)
        }

        function updateRedux(members) {
            dispatch(setMembers(members))
        }

        fetchAllMembers()

    }, [dispatch])

    return loading
}
