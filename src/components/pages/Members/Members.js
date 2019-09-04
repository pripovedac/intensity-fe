import React, {useState, useEffect} from 'react'
import MembersInfoTable from '../../ui/MembersInfoTable/MembersInfoTable'
import {getAllMembers} from '../../../services/api/user'
import {useDispatch} from 'react-redux'
import {setMembers} from '../../../store/actions/members.action'
import LoadingState from '../../loading-state/LoadingState'
import './Members.scss'
import MemberFilters from '../../ui/MemberFilters/MemberFilters'

function Members(props) {
    console.log('Rendering MembersPage component.')
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        async function fetchAllMembers() {
            const members = await getAllMembers()
            // console.log('members: ', members)
            if (members) {
                updateRedux(members)
            }
            setLoading(false)
        }

        function updateRedux(members) {
            dispatch(setMembers(members))
        }

        fetchAllMembers()

    }, [])

    if (!loading) {
        return (
            <div className="members-page">
                <MemberFilters/>
                <div className="members-data">
                    <MembersInfoTable/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="members-page">
                <LoadingState/>
            </div>
        )
    }
}

export default Members
