import React, {useState, useEffect} from 'react'
import './MembersInfoTable.scss'
import {selectAllMembers} from '../../../store/selectors/members.selector'
import {connect, useDispatch} from 'react-redux'
import StatusButton from "../Button/StatusButton/StatusButton";
import {toTableFormat} from '../../../services/dates'
import {bindActionCreators} from "redux";
import {changeMemberStatus} from '../../../store/actions/members.action'

function MembersInfoTable(props) {
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
        return props.allMembers.map(member => createSingleRow(member))
    }

    function changeUserStatus(id, isActive) {
        props.changeMemberStatus({id, isActive})
    }

    function createSingleRow(member) {
        // todo: members should be sorted by name
        return (
            <tr key={member.id}>
                {/*todo: should be link*/}
                <td>{`${member.name} ${member.lastname}`}</td>
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

function mapStateToProps(state) {
    return {
        allMembers: selectAllMembers(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeMemberStatus
        }, dispatch)
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MembersInfoTable)
