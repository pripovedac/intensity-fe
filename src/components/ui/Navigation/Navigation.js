import React from 'react'
import {useDispatch} from 'react-redux'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import LinkButton from '../Button/LinkButton/LinkButton'
import {Link} from 'react-router-dom'
import {selectUsername} from '../../../store/selectors/auth.selector'
import {logoutUser} from '../../../store/actions/auth.action'
import {withRouter} from 'react-router-dom'
import './Navigation.scss'

function Navigation(props) {
    const dispatch = useDispatch()
    const username = useSelectorWrapper(selectUsername)
    let pathname = props.location.search
        ? ''
        : props.location.pathname

    if (props.location.pathname === '/wod')
        pathname = '/wod'

    return (
        <div className="navigation">
            <nav>
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
            <p>You are logged in as
                <Link to="/profile">{username}</Link>
            </p>
        </div>
    )
}

export default withRouter(Navigation)
