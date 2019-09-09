import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setImageMode} from '../../store/actions/image.action'

export default function useProfilePictureSetup(userId, setPictureUrl) {
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchAvatar(userId, setPictureUrl) {
            const avatarUrl = `${process.env.REACT_APP_BE_URL}/user/${userId}/avatar`
            setPictureUrl(avatarUrl)
        }

        fetchAvatar(userId, setPictureUrl)

        function cleanRedux() {
            dispatch(setImageMode('upload'))
        }

        return cleanRedux

    }, [userId, setPictureUrl, dispatch])

}
