import React from 'react'
import {Link} from 'react-router-dom'
import './LinkButton.scss'

function LinkButton(props) {
    return (
        <Link
            to={props.path}
            className="link-button">
            <span>
                {props.pathname}
            </span>
            {props.children}
        </Link>
    )
}

export default LinkButton
