import React from 'react'
import {useSelectorWrapper} from '../../custom-hooks/useReduxHooks'
import {useDispatch}  from 'react-redux'
import StatusButton from '../Button/StatusButton/StatusButton'
import {addUserPayment} from  '../../../services/api/user'
import {selectActiveMember} from '../../../store/selectors/global.selector'
import {setActiveMember} from  '../../../store/actions/global.action'
import removeLoadingState from '../../../services/timeout'
import {userRoles} from '../../../services/enums'
import './UserInfo.scss'

export default function UserInfo(props) {
    const member = useSelectorWrapper(selectActiveMember)
    const dispatch = useDispatch()

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
    
    function addPaymentButton() {
        if(member.role === userRoles.member) {
            return (
                <StatusButton
                    type="button"
                    text="Add payment"
                    class="active"
                    onClick={() => addPayment(member.id)}
                />
            )
        }
    }

    async function addPayment(id) {
        props.setLoading(true)

        const res = await addUserPayment(id)
        if(!res.errorStatus) {
            dispatch(setActiveMember(res))
        } else {
            alert('Something went wrong with the payment.')
        }

        removeLoadingState(props.setLoading)
    }

    return (
        <div className="user-info">
            {displayAbout()}
            <p>Contact: {member.email}</p>
            {addPaymentButton()}
        </div>
    )
}
