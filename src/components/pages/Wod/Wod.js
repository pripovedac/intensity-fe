import React from 'react'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import Navigation from '../../ui/Navigation/Navigation.js'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import './Wod.scss'

function WodPage() {
    return (
        <div className="wod-page">
            <Navigation/>
            <div className="wod-container">
                <TrainingForm/>
                <div className="exercise-container">
                <ExerciseForm/>
                <ExerciseList/>
                </div>
            </div>
        </div>
    )
}

export default WodPage
