import React, {useState, useEffect} from 'react'
import './MembersInfoTable.scss'
import {selectAllMembers} from '../../../store/selectors/members.selector'
import {connect} from 'react-redux'

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
        console.log('all of them: ', props.allMembers)
        return props.allMembers.map(member => createSingleRow(member))
    }

    function createSingleRow(member) {
        return (
            <tr key={member.id}>
                <td>{`${member.name} ${member.lastname}`}</td>
                <td>{member.email}</td>
                <td>{member.activationDate}</td>
                <td>{member.trainingNum}</td>
                {/*todo: add buttons here*/}
                <td>{member.isActive}</td>
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

export default connect(
    mapStateToProps)
(MembersInfoTable)
