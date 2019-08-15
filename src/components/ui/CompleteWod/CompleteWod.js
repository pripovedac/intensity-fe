import React from 'react'
import './CompleteWod.scss'
import {selectMode} from "../../../store/selectors/global.selector";
import {selectWodWithExercises} from "../../../store/selectors/wod.selector";
import {bindActionCreators} from "redux";
import {setWodMode} from "../../../store/actions/global.action";
import {submitWod} from "../../../store/actions/wod.action";
import {connect} from "react-redux";
import {selectUser} from "../../../store/selectors/auth.selector";
import ExerciseList from "../ExerciseList/ExerciseList";
import {FaPencilAlt} from 'react-icons/fa'
import {IoMdCheckmarkCircle, IoMdCloseCircle} from 'react-icons/io'

function CompleteWod(props) {
    function displayEditButton() {
        if (props.user.role === 'user') {
            return (
                <button onClick={props.setWodMode}>
                    <FaPencilAlt/>
                </button>
            )
        }
    }

    function displayWodInfo() {
        const wordRound = props.wod.roundNumber > 1 ?
            'rounds' :
            'round'

        const wodName = props.wod.name
        const title = wodName != 'crossfit' && wodName != 'lightfit' ?
            <div className="title-container">
                <h1>{`${wodName}`}</h1>
                <h2>{`${props.wod.trainingType} ${props.wod.globalType} workout of the Day`}</h2>
            </div> :
            <h1> {`${props.wod.trainingType} ${props.wod.globalType} workout of the Day`}</h1>

        return (
            <div className="wod-info">
                {title}
                {/*todo: fix date and add time} */}
                <p>{`${props.wod.date}`}</p>
                <p>{`${props.wod.roundNumber} ${wordRound} for ${props.wod.duration}
                 minutes with ${props.wod.trainer}`}</p>
            </div>
        )
    }

    function displayExerciseList() {
        return (
            <ExerciseList
                exercises={props.wod.exercises}/>
        )
    }

    function displaySubmitButton() {
        return (
            <button className="submit-button">
                <IoMdCheckmarkCircle/>
            </button>
        )
    }

    return (
        <div className="complete-wod">
            {displayEditButton()}
            {displayWodInfo()}
            {displayExerciseList()}
            {displaySubmitButton()}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        mode: selectMode(state),
        wod: selectWodWithExercises(state),
        user: selectUser(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setWodMode,
            submitWod,
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompleteWod)

