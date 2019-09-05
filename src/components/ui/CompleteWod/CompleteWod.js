import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
import ButtonWithText from '../Button/ButtonWithText/ButtonWithText'
import ExerciseList from '../ExerciseList/ExerciseList'
import RoundedButton from '../Button/RoundedButton/RoundedButton'
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
import MemberList from '../MemberList/MemberList'
import {FaPencilAlt} from 'react-icons/fa'
import {toUserDateFormat} from '../../../services/dates'
import {isEmpty} from 'lodash'
import {addTrainings} from '../../../store/actions/auth.action'
import {setWodMode, notifyUpdate} from '../../../store/actions/global.action'
import {addNewWod, addNewMember, removeMember} from '../../../store/actions/wod.action'
import {replaceNewExercises} from '../../../store/actions/exercise.action'
import {signForTraining, signOutOfTraining} from '../../../services/api/training'
import {selectActiveTrainingId} from '../../../store/selectors/global.selector'
import {selectActiveWod, selectMembers} from '../../../store/selectors/wod.selector'
import {selectActiveExercises} from '../../../store/selectors/exercise.selector'
import {selectUser} from '../../../store/selectors/auth.selector'
import './CompleteWod.scss'

export default function CompleteWod(props) {
    const trainingId = useSelectorWrapper(selectActiveTrainingId)
    const wod = useSelectorWrapper(selectActiveWod)
    const exercises = useSelectorWrapper(selectActiveExercises)
    const user = useSelectorWrapper(selectUser)
    const members = useSelectorWrapper(selectMembers)
    
    console.log('setWodMODE: ', setWodMode)

    const dispatch = useDispatch()

    function displayEditButton() {
        if (user.role === 'user') {
            return (
                <button className="pen-button"
                        onClick={prepareWodForEditing}>
                    <FaPencilAlt/>
                </button>
            )
        }
    }

    function prepareWodForEditing() {
        dispatch(addNewWod(wod))
        dispatch(replaceNewExercises(exercises))
        dispatch(notifyUpdate())
        dispatch(setWodMode())
    }

    function displayWodInfo() {
        const wordRound = wod.roundNumber > 1 ?
            'rounds' :
            'round'

        const wodName = wod.name
        let title
        if (wodName !== 'crossfit' && wodName !== 'lightfit') {
            title = <div className="title-container">
                <h1>{`${wodName}`}</h1>
                <h2>{`${wod.trainingType} ${wod.globalType} workout of the Day`}</h2>
            </div>
        } else {
            title = <h1>
                {`${wod.trainingType} ${wod.globalType} workout of the Day`}
            </h1>
        }
        return (
            <div className="wod-info">
                {title}
                {/*todo: fix date and add time} */}
                <p>{`${toUserDateFormat(wod.date)}`}</p>
                <p>
                    {
                        `${
                            wod.roundNumber
                                ? `${wod.roundNumber} ${wordRound}`
                                : ''
                            } for ${wod.duration
                            } minutes with ${wod.trainer}`
                    }
                </p>
            </div>
        )
    }

    function displayExerciseList() {
        return (
            <ExerciseList exercises={exercises}/>
        )
    }

    function displaySubmitButton() {
        if (!checkIfSignedIn(user.id)) {
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
        if (user.role === 'user') {
            return (
                <ButtonWithText onClick={() => dispatch(setWodMode())}>
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
        if (members) {
            return members
                .map(({id}) => id)
                .includes(id)
        }
    }

    function displayMemberList() {
        return (
            <MemberList/>
        )
    }

    async function signIn() {
        const response = await signForTraining(user.id, trainingId)
        if (!response.errorStatus) {
            dispatch(addTrainings(response))
            const id = user.id
            const name = `${user.name} ${user.lastname}`
            dispatch(addNewMember({id, name}))
        }
    }

    async function signOut() {
        const response = await signOutOfTraining(user.id, trainingId)
        if (!response.errorStatus) {
            dispatch(addTrainings(response))
            dispatch(removeMember(user.id))
        }
    }

    if (!isEmpty(wod)) {
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
