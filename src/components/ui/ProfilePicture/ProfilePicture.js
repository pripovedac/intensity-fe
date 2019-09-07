import React from 'react'
import useHiddenInput from '../../custom-hooks/useHiddenInput'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import useProfilePictureSetup from '../../custom-hooks/useProfilePictureSetup'
import {useDispatch} from 'react-redux'
import {FiUpload, FiCheck} from 'react-icons/fi'
import {setImageMode} from '../../../store/actions/image.action'
import {selectUserId} from '../../../store/selectors/auth.selector'
import {uploadAvatar} from '../../../services/api/user'
import './ProfilePicture.scss'
import {selectImageMode} from '../../../store/selectors/image.selector'

export default function ProfilePicture(props) {
    console.log('Rendering ProfilePicture component.')
    // const [loading, setLoading] = useState(false)
    const imageMode = useSelectorWrapper(selectImageMode)
    const dispatch = useDispatch()

    const {
        HiddenInput,
        onHiddenInputClick,
        picture,
        pictureUrl,
        setPictureUrl,
        setPicture
    } = useHiddenInput()

    const userId = useSelectorWrapper(selectUserId)

    useProfilePictureSetup(userId, setPictureUrl, setPicture)

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await uploadAvatar(userId, picture)
        if (res.errorStatus) {
            alert('Something went wrong with your upload.')
        } else {
            dispatch(setImageMode('upload'))
        }
    }

    function displayButton() {
        // todo: Check which user is logged in.

        if (imageMode === 'submit') {
            return (
                <button type="submit">
                    <FiCheck/>
                </button>
            )
        } else {
            return (
                <button type="button" onClick={onHiddenInputClick}>
                    <FiUpload/>
                </button>
            )
        }
    }
        return (
            <form onSubmit={handleSubmit}
                  className="profile-picture">
                <img src={pictureUrl} alt="Avatar"/>
                <HiddenInput/>
                {displayButton()}
            </form>
        )
}
