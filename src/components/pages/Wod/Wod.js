import React from 'react'
import TrainingForm from '../../ui/TrainingForm/TrainingForm'
import Navigation from '../../ui/Navigation/Navigation.js'
import ExerciseForm from '../../ui/ExerciseForm/ExerciseForm'
import ExerciseList from '../../ui/ExerciseList/ExerciseList'
import './Wod.scss'
import {bindActionCreators} from 'redux'
import {setWodMode} from '../../../store/actions/global.action'
import {connect} from 'react-redux'
import {selectMode} from "../../../store/selectors/global.selector";

function WodPage(props) {
    function displayContent() {
        if (props.mode == 'wod') {
            return <TrainingForm/>
        } else if (props.mode == 'exercise') {
            return (
                <div className="exercise-container">
                    <ExerciseForm/>
                    <ExerciseList/>
                </div>
            )
        }
    }

    return (
        <div className="wod-page">
            <Navigation/>
            <div className="wod-container">
                <div className="hulk-container">
                    <img src="./images/hulk.jpg" alt="Hulk" width={300}/>
                </div>
                    {displayContent()}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        mode: selectMode(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setWodMode}, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WodPage)
