import React from 'react'
import ButtonWithText from '../Button/ButtonWithText/ButtonWithText'
import ExerciseList from '../ExerciseList/ExerciseList'
import RoundedButton from '../Button/RoundedButton/RoundedButton'
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
import {selectActiveTrainingId, selectMode} from '../../../store/selectors/global.selector'
import {selectActiveWod, selectMembers} from '../../../store/selectors/wod.selector'
import {selectActiveExercises} from '../../../store/selectors/exercise.selector'
import {bindActionCreators} from 'redux'
import {addTrainings} from '../../../store/actions/auth.action'
import {setWodMode} from '../../../store/actions/global.action'
import {addNewWod, submitWod, addNewMember, removeMember} from '../../../store/actions/wod.action'
import {replaceNewExercises} from '../../../store/actions/exercise.action'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors/auth.selector'
import {FaPencilAlt} from 'react-icons/fa'
import {isEmpty} from 'lodash'
import {signForTraining, signOutOfTraining} from '../../../services/api/training'
import {toUserDateFormat} from '../../../services/dates'
import MemberList from '../MemberList/MemberList'
import './CompleteWod.scss'

function CompleteWod(props) {
    function displayEditButton() {
        if (props.user.role === 'user') {
            return (
                <button className="pen-button"
                        onClick={prepareWodForEditing}>
                    <FaPencilAlt/>
                </button>
            )
        }
    }

    function prepareWodForEditing() {
        props.addNewWod(props.wod)
        props.replaceNewExercises(props.exercises)
        props.setWodMode()
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
                <p>{`${toUserDateFormat(props.wod.date)}`}</p>
                <p>
                    {
                        `${
                            props.wod.roundNumber
                                ? `${props.wod.roundNumber} ${wordRound}`
                                : ''
                            } for ${props.wod.duration
                            } minutes with ${props.wod.trainer}`
                    }
                </p>
            </div>
        )
    }

    function displayExerciseList() {
        return (
            <ExerciseList exercises={props.exercises}/>
        )
    }

    function displaySubmitButton() {
        if (!checkIfSignedIn(props.user.id)) {
            return (
                <RoundedButton onClick={signIn}>
                    <FaCheckCircle className="button-icon"/>
                </RoundedButton>
            )
        } else {
            return (
                <RoundedButton onClick={signOut}>
                    <FaTimesCircle className="button-icon"/>
                </RoundedButton>
            )
        }
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


    function checkIfSignedIn(id) {
        return props.members
            .map(({id}) => id)
            .includes(id)
    }

    function displayMemberList() {
        return (
            <MemberList/>
        )
    }

    async function signIn() {
        const response = await signForTraining(props.user.id, props.trainingId)
        if (!response.errorStatus) {
            props.addTrainings(response)
            const id = props.user.id
            const name = `${props.user.name} ${props.user.lastname}`
            props.addNewMember({id, name})
        }
    }

    async function signOut() {
        const response = await signOutOfTraining(props.user.id, props.trainingId)
        if (!response.errorStatus) {
            props.addTrainings(response)
            props.removeMember(props.user.id)
        }
    }

    if (!isEmpty(props.wod)) {
        return (
            <div className="complete-wod">
                <div className="content-container">
                    {displayEditButton()}
                    {displayWodInfo()}
                    {displayExerciseList()}
                    {displaySubmitButton()}
                </div>
                <div>
                    {displayMemberList()}
                </div>
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
        trainingId: selectActiveTrainingId(state),
        wod: selectActiveWod(state),
        exercises: selectActiveExercises(state),
        user: selectUser(state),
        members: selectMembers(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addNewWod,
            replaceNewExercises,
            addTrainings,
            setWodMode,
            submitWod,
            addNewMember,
            removeMember
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompleteWod)

