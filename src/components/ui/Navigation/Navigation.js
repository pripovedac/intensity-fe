import React from 'react'
import LinkButton from '../Button/LinkButton'
import './Navigation.scss'

function Navigation() {
    return (
        <nav className="navigation">
            <LinkButton path="/home" pathname="Home" />
            <LinkButton path="/wod"  pathname="WOD" />
            <LinkButton path="/members"  pathname="Members" />
            <LinkButton path="/profile"  pathname="Darko Stevanovic" />
            <button className="link-button">Logout</button>
        </nav>
    )
}

export default Navigation
