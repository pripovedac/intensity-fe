import React from 'react'
import useHiddenInput from '../../custom-hooks/useHiddenInput'
import './ProfilePicture.scss'

export default function ProfilePicture(props) {
    const {pictureUrl, HiddenInput, onHiddenInputClick} = useHiddenInput()

    function fileUploaderHandler() {

    }

    return (
        <div className="profile-picture">
            <img src={pictureUrl}/>
            <HiddenInput/>
            <button onClick={onHiddenInputClick}>Browse</button>
        </div>
    )
}
