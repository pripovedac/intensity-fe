import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getAvatar} from '../../services/api/user'
// import {useSelectorWrapper} from './useReduxHooks'
// import {selectImageLoadStatus, selectImageUrl} from '../../store/selectors/image.selector'
import {setImageMode} from '../../store/actions/image.action'

export default function useProfilePictureSetup(userId, setPictureUrl) {
    // const isLoaded = useSelectorWrapper(selectImageLoadStatus)
    // const imageUrl = useSelectorWrapper(selectImageUrl)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchAvatar(userId, setPictureUrl) {
            await getAvatar(userId, setPictureUrl)
        }

        // todo: See how to store images on FE. Currently, I haven't found the way.
        // if (!isLoaded) {
        //      console.log('fetched')
        fetchAvatar(userId, setPictureUrl)
        //
        //  } else {
        //      console.log('from redux ', url)
        // setPictureUrl(url)
        // const reader = new FileReader()
        // setPicture(reader.readAsDataURL(new Blob(url)))
        // }

        function cleanRedux() {
            dispatch(setImageMode('upload'))
        }

        return cleanRedux

    }, [userId, setPictureUrl, dispatch])

}
