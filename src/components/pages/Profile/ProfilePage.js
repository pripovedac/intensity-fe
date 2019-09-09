import React, {useState} from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture'
import UserForm from '../../ui/UserForm/UserForm'
import {selectUser} from '../../../store/selectors/auth.selector'
import {toUserDateFormat} from '../../../services/dates'
import {userRoles} from '../../../services/enums'
import classNames from 'classnames'
import './ProfilePage.scss'

export default function ProfilePage() {
    const user = useSelectorWrapper(selectUser)
    const [loading, setLoading] = useState(false)

    function displayUneditableInfo(user) {
        if (user.role === userRoles.member) {
            if (user.isActive) {
                return (
                    <div className="uneditable-info">
                        <p>{`Remained trainings: ${user.trainingNum}`}</p>
                        <p>{`Activation date: ${toUserDateFormat(user.activationDate)}`}</p>
                    </div>
                )
            } else {
                return (
                    <div className="uneditable-info">
                        <p>Account is not activated</p>
                    </div>
                )
            }
        }
    }

    const classes = classNames({
        'profile-page': true,
        'loading-profile': loading
    })

    return (
        <div className={classes}>

            <h1>{`${user.name} ${user.lastname}`}</h1>
            <h2>{`${user.role}`}</h2>

            <div className="editable-info">
                <UserForm setLoading={setLoading}/>
                <ProfilePicture/>
            </div>

            {displayUneditableInfo(user)}

        </div>
    )
}
