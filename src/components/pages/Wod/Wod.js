import React from 'react'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import Navigation from '../../ui/Navigation/Navigation.js'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import './Wod.scss'

function WodPage() {
    return (
        <div className="wod-page">
            <Navigation/>
            <div className="wod-container">
                <TrainingForm/>
                <ExerciseForm/>
            </div>
        </div>
    )
}

export default WodPage
