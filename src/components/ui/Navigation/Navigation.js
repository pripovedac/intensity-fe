import React from 'react'
import LinkButton from '../Button/LinkButton'
import {logoutUser} from '../../../store/actions/auth.action'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './Navigation.scss'

function Navigation(props) {
    return (
        <nav className="navigation">
            <LinkButton path="/home" pathname="Home"/>
            <LinkButton path="/wod" pathname="WOD"/>
            <LinkButton path="/members" pathname="Members"/>
            <LinkButton path="/profile" pathname="Darko Stevanovic"/>
            <button
                className="link-button"
                onClick={props.logoutUser}>
                Logout
            </button>
        </nav>
    )
}

function mapStateToProps() {
    return null
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser}, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(Navigation)
