import React, {useState} from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import useProfilePageSetup from '../../custom-hooks/useProfilePageSetup'
import UserForm from '../../ui/UserForm/UserForm'
import UserInfo from '../../ui/UserInfo/UserInfo'
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture'
import LoadingState from '../../loading-state/LoadingState'
import {selectUser} from '../../../store/selectors/auth.selector'
import {selectActiveMember} from '../../../store/selectors/global.selector'
import {toUserDateFormat} from '../../../services/dates'
import {userRoles} from '../../../services/enums'
import queryString from 'query-string'
import classNames from 'classnames'
import './ProfilePage.scss'

export default function ProfilePage(props) {
    const user = useSelectorWrapper(selectUser)
    const [loadingStyle, setLoadingStyle] = useState(false)

    const {search} = props.location
    const urlId = queryString.parse(search).id

    const loading = useProfilePageSetup(urlId, user, props.history)
    const member = useSelectorWrapper(selectActiveMember)

    function displayUneditableInfo(user) {
        if (member.role === userRoles.member) {
            if (member.isActive) {
                return (
                    <div className="uneditable-info">
                        <p>{`Remained trainings: ${member.trainingNum}`}</p>
                        <p>{`Activation date: ${toUserDateFormat(member.activationDate)}`}</p>
                    </div>
                )
            } else {
                return (
                    <div className="uneditable-info">
                        <p>Account is not activated</p>
                        <p>{member.activationDate
                            ? `Last activation date: ${toUserDateFormat(member.activationDate)}`
                            : 'This account has never been activated.'
                        }</p>
                    </div>
                )
            }
        }
    }

    function displayEditableInfo() {
        if (!urlId) {
            return (
                <div className="editable-info">
                    <UserForm
                        setLoading={setLoadingStyle}
                    />
                    <ProfilePicture id={urlId}/>
                </div>
            )
        } else {
            return (
                <div className="editable-info">
                    <UserInfo member={member}/>
                    <ProfilePicture id={urlId}/>
                </div>
            )
        }
    }

    const classes = classNames({
        'profile-page': true,
        'loading-profile': loadingStyle
    })

    if (!loading) {
        return (
            <div className={classes}>

                <h1>{`${member.name} ${member.lastname}`}</h1>
                <h2>{`${member.role}`}</h2>

                {displayEditableInfo()}
                {displayUneditableInfo(user)}

            </div>
        )
    } else
        return (
            <div className="profile-page">
                <LoadingState/>
            </div>
        )
}
