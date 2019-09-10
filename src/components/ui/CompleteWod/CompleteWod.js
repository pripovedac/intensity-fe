import React, {useState} from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch} from 'react-redux'
import ButtonWithText from '../Button/ButtonWithText/ButtonWithText'
import ExerciseList from '../ExerciseList/ExerciseList'
import RoundedButton from '../Button/RoundedButton/RoundedButton'
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
import MemberList from '../MemberList/MemberList'
import {FiEdit, FiDelete} from 'react-icons/fi'
import {isDateOld, toUserDateFormat} from '../../../services/dates'
import {isEmpty} from 'lodash'
import {userRoles} from '../../../services/enums'
import {addTrainings} from '../../../store/actions/auth.action'
import {setWodMode, notifyUpdate} from '../../../store/actions/global.action'
import {addNewWod, addNewMember, removeMember, removeActiveWod} from '../../../store/actions/wod.action'
import {removeActiveExercises, replaceNewExercises} from '../../../store/actions/exercise.action'
import {signForTraining, signOutOfTraining} from '../../../services/api/training'
import {deleteWod} from '../../../services/api/wod'
import {selectActiveTrainingId} from '../../../store/selectors/global.selector'
import {selectActiveWod, selectMembers} from '../../../store/selectors/wod.selector'
import {selectActiveExercises} from '../../../store/selectors/exercise.selector'
import {selectUser} from '../../../store/selectors/auth.selector'
import removeLoadingState from '../../../services/timeout'
import './CompleteWod.scss'

export default function CompleteWod(props) {
    const [loading, setLoading] = useState(false)
    const trainingId = useSelectorWrapper(selectActiveTrainingId)
    const wod = useSelectorWrapper(selectActiveWod)
    const exercises = useSelectorWrapper(selectActiveExercises)
    const user = useSelectorWrapper(selectUser)
    const members = useSelectorWrapper(selectMembers)

    const dispatch = useDispatch()

    function displayEditButton() {
        if (user.role !== userRoles.member) {
            return (
                <div className="control-buttons">
                    <button
                        onClick={prepareWodForEditing}>
                        <FiEdit/>
                    </button>
                    <button
                        onClick={removeWod}>
                        <FiDelete/>
                    </button>
                </div>
            )
        }
    }

    function prepareWodForEditing() {
        dispatch(addNewWod(wod))
        dispatch(replaceNewExercises(exercises))
        dispatch(notifyUpdate())
        dispatch(setWodMode())
    }

    async function removeWod() {
        if (window.confirm(
            'You are going to going to delete complete WOD.\n' +
            'Do you want to procede?')
        ) {
            props.setWodLoading(true)
            const res = await deleteWod(wod.id)
            if (!res.errorStatus) {
                dispatch(removeActiveWod())
                dispatch(removeActiveExercises())
            } else {
                alert('There was a problem with wod deletion.')
            }

            removeLoadingState(props.setWodLoading)
        }
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
                <p>{`${toUserDateFormat(wod.date)}`}</p>
                <p>
                    {
                        `${
                            wod.roundNumber
                                ? `${wod.roundNumber} ${wordRound}`
                                : ''
                            }
                            ${
                            wod.duration
                                ? `for ${wod.duration} minutes`
                                : ''
                            } with ${wod.trainer}
                        `
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

    function displaySigningButton() {
        const isOld = isDateOld(wod.date)

        if (!checkIfSignedIn(user.id)) {
            return (
                <RoundedButton
                    onClick={signIn}
                    disabled={isOld}>
                    <FaCheckCircle className="button-icon"/>
                </RoundedButton>
            )
        } else {
            return (
                <RoundedButton
                    onClick={signOut}
                    disabled={isOld}>
                    <FaTimesCircle className="button-icon"/>
                </RoundedButton>
            )
        }
    }

    function displayAddButton() {
        if (user.role === userRoles.trainer) {
            return (
                <ButtonWithText onClick={() => dispatch(setWodMode())}>
                    Add wod
                </ButtonWithText>
            )
        }
    }

    function displayEmptyWod() {
        return (
            <div>
                <p>
                    WOD hasn't been posted yet.
                </p>
                <img src={require("./nothing-here.jpg")}
                     alt="Nothing here."/>
            </div>
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
            <MemberList loading={loading}/>
        )
    }

    async function signIn() {
        setLoading(true)
        const response = await signForTraining(user.id, trainingId)
        if (!response.errorStatus) {
            dispatch(addTrainings(response))
            const id = user.id
            const name = `${user.name} ${user.lastname}`
            dispatch(addNewMember({id, name}))
        } else {
            alert(response.exception.message)
        }
        removeLoadingState(setLoading)
    }

    async function signOut() {
        setLoading(true)
        const response = await signOutOfTraining(user.id, trainingId)
        if (!response.errorStatus) {
            dispatch(addTrainings(response))
            dispatch(removeMember(user.id))
            removeLoadingState(setLoading)
        }
    }

    if (!isEmpty(wod)) {
        return (
            <div className="complete-wod">
                <div className="content-container">
                    {displayEditButton()}
                    {displayWodInfo()}
                    {displayExerciseList()}
                    {displaySigningButton()}
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
            </div>
        )
    }
}
