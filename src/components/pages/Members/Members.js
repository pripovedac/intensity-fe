import React, {useState, useEffect} from 'react'
import MembersInfoTable from '../../ui/MembersInfoTable/MembersInfoTable'
import LoadingState from '../../loading-state/LoadingState'
import MemberFilters from '../../ui/MemberFilters/MemberFilters'
import {useDispatch} from 'react-redux'
import {getAllMembers} from '../../../services/api/user'
import {setMembers} from '../../../store/actions/members.action'
import './Members.scss'

function Members(props) {
    console.log('Rendering MembersPage component.')
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        async function fetchAllMembers() {
            const members = await getAllMembers()
            if (members) {
                updateRedux(members)
            }
            setLoading(false)
        }

        function updateRedux(members) {
            dispatch(setMembers(members))
        }

        fetchAllMembers()

    }, [dispatch])

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
