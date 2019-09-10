import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {selectActiveMember} from '../../../store/selectors/global.selector'
import './UserInfo.scss'

export default function UserInfo() {
    const member = useSelectorWrapper(selectActiveMember)

    function displayAbout() {
        if(member.about) {
            return(
                <p>{member.about}</p>
            )
        } else {
            return(
                <p>This {`${member.role}`} is a bit shy, so there is nothing in his about section.</p>
            )
        }
    }


    return (
        <div className="user-info">
            {displayAbout()}
            <p>Contact: {member.email}</p>
        </div>
    )
}
