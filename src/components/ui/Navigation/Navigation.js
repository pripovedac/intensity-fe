import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
import LinkButton from '../Button/LinkButton/LinkButton'
import {logoutUser} from '../../../store/actions/auth.action'
import {selectUsername} from '../../../store/selectors/auth.selector'
import './Navigation.scss'

export default function Navigation(props) {
    const username = useSelectorWrapper(selectUsername)
    const dispatch = useDispatch()

    return (
        <nav className="navigation">
            <LinkButton path="/home" pathname="Home"/>
            <LinkButton path="/members" pathname="Members"/>
            <LinkButton path="/profile" pathname={username}/>
            <button
                className="link-button"
                onClick={() => dispatch(logoutUser())}>
                Logout
            </button>
        </nav>
    )
}
