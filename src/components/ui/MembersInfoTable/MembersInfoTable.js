import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import StatusButton from '../Button/StatusButton/StatusButton'
import {Link} from 'react-router-dom'
import {toTableFormat} from '../../../services/dates'
import {changeMemberStatus} from '../../../store/actions/members.action'
import {selectAllMembers} from '../../../store/selectors/members.selector'
import {useDispatch} from 'react-redux'
import './MembersInfoTable.scss'

export default function MembersInfoTable(props) {
    const allMembers = useSelectorWrapper(selectAllMembers)
    const dispatch = useDispatch()

    function displayHeaders() {
        return (
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Activation date</th>
                <th>Remained trainings</th>
                <th>Status</th>
            </tr>
        )
    }

    function displayUsersInfo() {
        return allMembers.map(member => createSingleRow(member))
    }

    function changeUserStatus(id, isActive) {
        dispatch(changeMemberStatus({id, isActive}))
    }

    function createSingleRow(member) {
        // todo: members should be sorted by name
        return (
            <tr key={member.id}>
                    <td>
                        <Link to={{
                            pathname: '/profile',
                            search: `?id=${member.id}`
                        }}>
                            {`${member.name} ${member.lastname}`}
                        </Link>
                    </td>
                    <td>{member.email}</td>
                    <td>{
                        member.activationDate
                            ? toTableFormat(member.activationDate)
                            : ""
                    }</td>
                    <td>{member.trainingNum}</td>
                    <td>{
                        member.isActive
                            ? <StatusButton
                                class="inactive"
                                text="Deactivate"
                                onClick={() => changeUserStatus(member.id, false)}/>
                            : <StatusButton
                                class="active"
                                text="Activate"
                                onClick={() => changeUserStatus(member.id, true)}/>
                    }</td>
            </tr>
        )
    }

    return (
        <table className="members-table">
            <caption>Intensity members</caption>
            <thead>
            {displayHeaders()}
            </thead>
            <tbody>
            {displayUsersInfo()}
            </tbody>
        </table>
    )
}
