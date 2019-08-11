import React from 'react'
import './PublicButton.scss'

function PublicButton(props) {
    return (
        <button className="public-button"
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default PublicButton
