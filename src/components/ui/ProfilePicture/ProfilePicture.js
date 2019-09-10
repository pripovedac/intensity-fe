import React from 'react'
import useHiddenInput from '../../custom-hooks/useHiddenInput'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import useProfilePictureSetup from '../../custom-hooks/useProfilePictureSetup'
import {useDispatch} from 'react-redux'
import OnlyIconButton from '../Button/OnlyIconButton/OnlyIconButton'
import {FiUpload, FiCheck, FiRefreshCcw} from 'react-icons/fi'
import {setImageMode} from '../../../store/actions/image.action'
import {selectUserId} from '../../../store/selectors/auth.selector'
import {selectImageMode} from '../../../store/selectors/image.selector'
import {uploadAvatar} from '../../../services/api/user'
import {imageModes} from '../../../services/enums'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import './ProfilePicture.scss'

function ProfilePicture(props) {
    console.log('Rendering ProfilePicture component.')
    const imageMode = useSelectorWrapper(selectImageMode)
    const dispatch = useDispatch()

    const {
        HiddenInput,
        onHiddenInputClick,
        picture,
        pictureUrl,
        setPictureUrl,
        originalPictureUrl,
        setOriginalPictureUrl
    } = useHiddenInput()

    const userId = useSelectorWrapper(selectUserId)
    const {search} = props.location
    const urlId = queryString.parse(search).id
    const parameter = urlId ? urlId : userId

    useProfilePictureSetup(parameter, setPictureUrl, setOriginalPictureUrl)

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await uploadAvatar(userId, picture)
        if (res.errorStatus) {
            alert('Something went wrong with your upload.')
        } else {
            dispatch(setImageMode(imageModes.upload))
        }
    }

    function reverseChanges() {
        setPictureUrl(originalPictureUrl)
        dispatch(setImageMode(imageModes.upload))
    }

    function displayButton() {
        if (!props.id) {
            if (imageMode === imageModes.upload) {
                return (
                    <OnlyIconButton
                        type="button"
                        onClick={onHiddenInputClick}>
                        <FiUpload/>
                    </OnlyIconButton>
                )
            } else {
                return (
                    <div className="button-container">
                        <OnlyIconButton
                            type="button"
                            onClick={onHiddenInputClick}>
                            <FiUpload/>
                        </OnlyIconButton>

                        <OnlyIconButton
                            type="button"
                            onClick={reverseChanges}>
                            <FiRefreshCcw/>
                        </OnlyIconButton>

                        <OnlyIconButton
                            type="submit">
                            <FiCheck/>
                        </OnlyIconButton>
                    </div>
                )
            }
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

export default withRouter(ProfilePicture)
