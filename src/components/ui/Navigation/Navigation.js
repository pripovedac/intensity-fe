import React from 'react'
import LinkButton from '../Button/LinkButton/LinkButton'
import {logoutUser} from '../../../store/actions/auth.action'
import {selectUsername} from '../../../store/selectors/auth.selector'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './Navigation.scss'

function Navigation(props) {
    return (
        <nav className="navigation">
            <LinkButton path="/home" pathname="Home"/>
            <LinkButton path="/members" pathname="Members"/>
            <LinkButton path="/profile" pathname={props.username}/>
            <button
                className="link-button"
                onClick={props.logoutUser}>
                Logout
            </button>
        </nav>
    )
}

function mapStateToProps(state) {
    return {
        username: selectUsername(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser}, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)
