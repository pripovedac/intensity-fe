import React, {useState} from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import useProfilePageSetup from '../../custom-hooks/useProfilePageSetup'
import {useDispatch} from 'react-redux'
import UserForm from '../../ui/UserForm/UserForm'
import UserInfo from '../../ui/UserInfo/UserInfo'
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture'
import OnlyIconButton from '../../ui/Button/OnlyIconButton/OnlyIconButton'
import {FiTrash2} from 'react-icons/fi'
import LoadingState from '../../loading-state/LoadingState'
import {logoutUser} from '../../../store/actions/auth.action'
import {selectUser} from '../../../store/selectors/auth.selector'
import {selectActiveMember} from '../../../store/selectors/global.selector'
import {toUserDateFormat} from '../../../services/dates'
import {userRoles} from '../../../services/enums'
import {deleteUser} from '../../../services/api/user'
import queryString from 'query-string'
import classNames from 'classnames'
import './ProfilePage.scss'

export default function ProfilePage(props) {
    const user = useSelectorWrapper(selectUser)
    const [loadingStyle, setLoadingStyle] = useState(false)
    const dispatch = useDispatch()

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
                            : 'This account has never been activated'
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
                    <UserInfo setLoading={setLoadingStyle}
                    />
                    <ProfilePicture id={urlId}/>
                </div>
            )
        }
    }

    function displayDeleteButton(user, member) {
        if (user.id === member.id)
            return (
                <OnlyIconButton onClick={deleteAccount}>
                    <FiTrash2 className="trash-button"/>
                </OnlyIconButton>
            )
    }

    async function deleteAccount() {
        if (window.confirm(
            `${user.name}, are you sure you want to delete your account?\nWe will sure miss you.`)
        ) {
            const response = await deleteUser(user.id)
            if (!response.errorStatus) {
                dispatch(logoutUser())
            }
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
                {displayDeleteButton(user, member)}

            </div>
        )
    } else
        return (
            <div className="profile-page">
                <LoadingState/>
            </div>
        )
}
