import React from 'react'
import ButtonWithText from '../Button/ButtonWithText/ButtonWithText'
import ExerciseList from '../ExerciseList/ExerciseList'
import RoundedButton from '../Button/RoundedButton/RoundedButton'
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
import {selectActiveTrainingId, selectMode} from '../../../store/selectors/global.selector'
import {selectActiveWodWithExercises, selectMembers} from '../../../store/selectors/wod.selector'
import {bindActionCreators} from 'redux'
import {addTrainings} from '../../../store/actions/auth.action'
import {setWodMode} from '../../../store/actions/global.action'
import {submitWod, addNewMember} from '../../../store/actions/wod.action'
import {connect} from 'react-redux'
import {selectUser} from '../../../store/selectors/auth.selector'
import {FaPencilAlt} from 'react-icons/fa'
import {isEmpty} from 'lodash'
import {signForTraining} from '../../../services/api/training'
import {toUserDateFormat} from '../../../services/dates'
import MemberList from '../MemberList/MemberList'
import './CompleteWod.scss'

function CompleteWod(props) {
    console.log('Rendering Complete Wod Component')

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
                <p>{`${toUserDateFormat(props.wod.date)}`}</p>
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
        console.log('test: ', props.members
            .map(({id}) => id)
            .includes(id))
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
            const myName = `${props.user.name} ${props.user.lastname}`
            props.addNewMember(myName)
        }
    }

    async function signOut() {
        // todo
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
        wod: selectActiveWodWithExercises(state),
        user: selectUser(state),
        members: selectMembers(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addTrainings,
            setWodMode,
            submitWod,
            addNewMember
        }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompleteWod)

