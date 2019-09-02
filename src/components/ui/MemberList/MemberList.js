import React from 'react'
import './MemberList.scss'
import {connect} from "react-redux";
import {selectMembers} from "../../../store/selectors/wod.selector";

function MemberList(props) {
    console.log('Rendering MemberList component.')
    function displayContent() {
        if (props.members.length) {
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
        return props.members.map(member => <li key={member}>{member}</li>)
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
