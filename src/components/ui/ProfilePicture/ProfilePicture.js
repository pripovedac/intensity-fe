import React from 'react'
import useHiddenInput from '../../custom-hooks/useHiddenInput'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import useProfilePictureSetup from '../../custom-hooks/useProfilePictureSetup'
import {FiUpload, FiCheck} from 'react-icons/fi'
import {selectUserId} from '../../../store/selectors/auth.selector'
import {uploadAvatar} from '../../../services/api/user'
import './ProfilePicture.scss'

export default function ProfilePicture(props) {
    console.log('Rendering ProfilePicture component.')
    // const [loading, setLoading] = useState(false)

    const {
        HiddenInput,
        onHiddenInputClick,
        picture,
        pictureUrl,
        setPictureUrl
    } = useHiddenInput()

    const userId = useSelectorWrapper(selectUserId)

    useProfilePictureSetup(userId, setPictureUrl)

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await uploadAvatar(userId, picture)
        if (res.errorStatus) {
            alert('Something went wrong with your upload.')
        }
    }

    return (
        <form onSubmit={handleSubmit}
              className="profile-picture">
            <img src={pictureUrl} alt="Avatar"/>
            <HiddenInput/>
            <button type="button" onClick={onHiddenInputClick}>
                <FiUpload/>
            </button>
            <button type="submit">
                <FiCheck/>
            </button>
        </form>
    )
}
