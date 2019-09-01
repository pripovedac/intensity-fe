import React from 'react'
import ButtonWithText from '../Button/ButtonWithText/ButtonWithText'
import ExerciseList from '../ExerciseList/ExerciseList'
import RoundedButton from '../Button/RoundedButton/RoundedButton'
import {FaCheckCircle} from 'react-icons/fa'
import {selectMode} from '../../../store/selectors/global.selector'
import {selectActiveWodWithExercises} from '../../../store/selectors/wod.selector'
import {bindActionCreators} from 'redux'
import {addTrainings} from '../../../store/actions/auth.action'
import {setWodMode} from '../../../store/actions/global.action'
import {submitWod} from '../../../store/actions/wod.action'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors/auth.selector'
import {FaPencilAlt} from 'react-icons/fa'
import {isEmpty} from 'lodash'
import {signForTraining} from '../../../services/api/training'
import './CompleteWod.scss'

function CompleteWod(props) {
    function displayEditButton() {
        if (props.user.role === 'user') {
            return (
                <button className="pen-button"
                        onClick={props.setWodMode}>
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
        let title
        if (wodName !== 'crossfit' && wodName !== 'lightfit') {
            title = <div className="title-container">
                <h1>{`${wodName}`}</h1>
                <h2>{`${props.wod.trainingType} ${props.wod.globalType} workout of the Day`}</h2>
            </div>
        } else {
            title = <h1>
                {`${props.wod.trainingType} ${props.wod.globalType} workout of the Day`}
            </h1>
        }
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
            <ExerciseList exercises={props.wod.exercises}/>
        )
    }

    function displaySubmitButton() {
        return (
            <RoundedButton
                onClick={signIn}>
                <FaCheckCircle className="button-icon"/>
            </RoundedButton>
        )
    }

    function displayAddButton() {
        if (props.user.role === 'user') {
            return (
                <ButtonWithText onClick={props.setWodMode}>
                    Add wod
                </ButtonWithText>
            )
        }
    }

    function displayEmptyWod() {
        return (
            <p>
                WOD hasn't been posted yet.
            </p>
        )
    }

    function displaySignButtons() {
        // todo: Display button according to user's trainings.
        return (
            <RoundedButton>
                <FaCheckCircle className="button-icon"/>
            </RoundedButton>
        )
    }

    async function signIn() {
        const trainings = await signForTraining(props.user.id, props.wod.id)
        props.addTrainings(trainings)
        console.log('trainings added')
    }

    if (!isEmpty(props.wod)) {
        return (
            <div className="complete-wod">
                {displayEditButton()}
                {displayWodInfo()}
                {displayExerciseList()}
                {displaySubmitButton()}
            </div>
        )
    } else {
        return (
            <div className="empty-wod">
                {displayAddButton()}
                {displayEmptyWod()}
                {displaySignButtons()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mode: selectMode(state),
        wod: selectActiveWodWithExercises(state),
        user: selectUser(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addTrainings,
            setWodMode,
            submitWod,
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompleteWod)

