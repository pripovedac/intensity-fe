import React from 'react'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import Navigation from '../../ui/Navigation/Navigation.js'
import './Wod.scss'

function WodPage() {
    return (
        <div className="wod-page">
            <Navigation/>
            <TrainingForm/>
        </div>
    )
}

export default WodPage
