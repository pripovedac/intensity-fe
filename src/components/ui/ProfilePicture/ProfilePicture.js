import React from 'react'
import useHiddenInput from '../../custom-hooks/useHiddenInput'
import {useSelectorWrapper} from "../../custom-hooks/useReduxHooks";
import {FiUpload, FiCheck} from 'react-icons/fi'
import {selectUserId} from '../../../store/selectors/auth.selector'
import {uploadAvatar} from '../../../services/api/user'
import './ProfilePicture.scss'

export default function ProfilePicture(props) {
    const {
        HiddenInput,
        onHiddenInputClick,
        picture,
        pictureUrl,
    } = useHiddenInput()

    const userId = useSelectorWrapper(selectUserId)

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
            <img src={pictureUrl}/>
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
