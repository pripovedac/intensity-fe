import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {selectMembers} from '../../../store/selectors/wod.selector'
import './MemberList.scss'

export default function MemberList(props) {
    const members = useSelectorWrapper(selectMembers)

    function displayContent() {
        if (members && members.length) {
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
        return members.map(member => <li key={member.id}>{member.name}</li>)
    }

    return (
        <div className="member-list">
            <h2>Members</h2>
            {displayContent()}
        </div>
    )
}
