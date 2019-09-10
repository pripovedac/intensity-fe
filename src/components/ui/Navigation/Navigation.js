import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
import LinkButton from '../Button/LinkButton/LinkButton'
import {logoutUser} from '../../../store/actions/auth.action'
import {selectUsername} from '../../../store/selectors/auth.selector'
import {withRouter} from 'react-router-dom'
import './Navigation.scss'

function Navigation(props) {
    const username = useSelectorWrapper(selectUsername)
    const dispatch = useDispatch()
    const pathName = props.location.search
        ? ''
        : props.location.pathname

    return (
        <nav className="navigation">
            <LinkButton
                path="/home"
                activePath={pathName}
                pathname="Home"
            />
            <LinkButton
                path="/members"
                activePath={pathName}
                pathname="Members"/>
            <LinkButton
                path="/profile"
                activePath={pathName}
                pathname={username}/>
            <button
                className="link-button"
                onClick={() => dispatch(logoutUser())}>
                Logout
            </button>
        </nav>
    )
}

export default withRouter(Navigation)
