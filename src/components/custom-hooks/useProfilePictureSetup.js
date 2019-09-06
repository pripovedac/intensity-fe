import {useEffect} from 'react'
import {getAvatar} from '../../services/api/user'
import {useSelectorWrapper} from './useReduxHooks'
import {getImageLoadStatus, getImageUrl} from '../../store/selectors/image.selector'

export default function useProfilePictureSetup(userId, setPictureUrl) {
    const isLoaded = useSelectorWrapper(getImageLoadStatus)
    const imageUrl = useSelectorWrapper(getImageUrl)

    useEffect(() => {
        async function fetchAvatar(userId, setPictureUrl) {
            await getAvatar(userId, setPictureUrl)
        }

        if (isLoaded) {
            console.log('fetched')
            fetchAvatar(userId, setPictureUrl)
        } else {
            console.log('from redux')
            setPictureUrl(imageUrl)
        }


    }, [userId, setPictureUrl])

}
