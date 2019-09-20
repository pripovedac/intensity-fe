import React from 'react'
import {useDispatch} from 'react-redux'
import LinkButton from '../Button/LinkButton/LinkButton'
import {logoutUser} from '../../../store/actions/auth.action'
import {withRouter} from 'react-router-dom'
import './Navigation.scss'

function Navigation(props) {
    const dispatch = useDispatch()
    let pathname = props.location.search
        ? ''
        : props.location.pathname

    if (props.location.pathname == '/wod')
        pathname = '/wod'

    return (
        <nav className="navigation">
            <LinkButton
                path="/home"
                activePath={pathname}
                pathname="Home"
            />
            <LinkButton
                path="/wod"
                activePath={pathname}
                pathname="Wod"
            />
            <LinkButton
                path="/members"
                activePath={pathname}
                pathname="Members"/>
            <LinkButton
                path="/profile"
                activePath={pathname}
                pathname="Profile"/>
            <button
                className="link-button"
                onClick={() => dispatch(logoutUser())}>
                Logout
            </button>
        </nav>
    )
}

export default withRouter(Navigation)
