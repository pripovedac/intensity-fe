import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setImageMode} from '../../store/actions/image.action'
import {imageModes} from '../../services/enums'

export default function useProfilePictureSetup(userId, setPictureUrl, setOriginalPictureUrl) {
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchAvatar(userId, setPictureUrl, setOriginalPictureUrl) {
            const avatarUrl = `${process.env.REACT_APP_BE_URL}/user/${userId}/avatar`
            setPictureUrl(avatarUrl)
            setOriginalPictureUrl(avatarUrl)
        }

        fetchAvatar(userId, setPictureUrl, setOriginalPictureUrl)

        function cleanRedux() {
            dispatch(setImageMode(imageModes.upload))
        }

        return cleanRedux

    }, [userId, setPictureUrl, setOriginalPictureUrl, dispatch])

}
