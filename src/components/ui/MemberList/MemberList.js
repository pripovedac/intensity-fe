import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {selectMembers} from '../../../store/selectors/wod.selector'
import classNames from 'classnames'
import './MemberList.scss'
import {Link} from "react-router-dom";

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
        return members.map(member =>
            <li key={member.id}>
                <Link to={{
                    pathname: '/profile',
                    search: `?id=${member.id}`
                }}>
                    {member.name}
                </Link>
            </li>)
    }

    const classes = classNames({
        'member-list': true,
        'loading-members': props.loading
    })

    return (
        <div className={classes}>
            <h2>Members</h2>
            {displayContent()}
        </div>
    )
}
