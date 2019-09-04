import React from 'react'
import {selectMembers} from '../../../store/selectors/wod.selector'
import {connect} from 'react-redux'
import './MemberList.scss'

function MemberList(props) {
    function displayContent() {
        if (props.members && props.members.length) {
            return (
                <ul>
                    {displayMembers()}
                </ul>
            )
        } else {
            return (
                <p>You are the first, ma boi!</p>
            )
        }
    }

    function displayMembers() {
        return props.members.map(member => <li key={member.id}>{member.name}</li>)
    }

    return (
        <div className="member-list">
            <h2>Members</h2>
            {displayContent()}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        members: selectMembers(state),
    }
}

export default connect(
    mapStateToProps
)(MemberList)

