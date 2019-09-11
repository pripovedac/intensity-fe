import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import './LinkButton.scss'

export default function LinkButton(props) {
    const classes = classNames({
        'link-button': true,
        'active-page': props.path === props.activePath
    })

    return (
        <Link
            to={props.path}
            className={classes}>
            <span>
                {props.pathname}
            </span>
            {props.children}
        </Link>
    )
}


