import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getSingleMember} from '../../services/api/user'
import {removeActiveMember, setActiveMember} from '../../store/actions/global.action'
import removeLoadingState from '../../services/timeout'

export default function useProfilePageSetup(urlId, user, history) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getMemberInfo() {
            if (urlId) {
                const dbUser = await getSingleMember(urlId)
                if (dbUser.errorStatus) {
                    alert('User with provided id does not exist.')
                    history.push('/profile')
                } else {
                    dispatch(setActiveMember(dbUser))
                }
            } else {
                dispatch(setActiveMember(user))
            }
        }

        getMemberInfo()
        removeLoadingState(setLoading)

        function cleanRedux() {
            dispatch(removeActiveMember())
        }

        return cleanRedux
    }, [urlId, user, history, dispatch])

    return loading
}
