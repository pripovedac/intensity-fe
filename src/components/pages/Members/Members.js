import React, {useState, useEffect} from 'react'
import MembersInfoTable from '../../ui/MembersInfoTable/MembersInfoTable'
import {getAllMembers} from '../../../services/api/user'
import {useDispatch} from 'react-redux'
import {setMembers} from '../../../store/actions/members.action'
import Navigation from '../../ui/Navigation/Navigation'
import './Members.scss'

function Members(props) {
    console.log('Rendering MembersPage component.')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        async function fetchAllMembers() {
            const members = await getAllMembers()
            // console.log('members: ', members)
            if (members) {
                updateRedux(members)
            }
        }

        function updateRedux(members) {
            dispatch(setMembers(members))
        }

        fetchAllMembers()

    }, [])

    return (
        <div className="members-page">
            <Navigation/>
            <div className="members-data">
            <MembersInfoTable/>
            </div>
        </div>
    )
}

export default Members
