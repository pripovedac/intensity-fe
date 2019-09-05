import React from 'react'
import useMembersPageSetup from '../../custom-hooks/useMembersPageSetup'
import MembersInfoTable from '../../ui/MembersInfoTable/MembersInfoTable'
import LoadingState from '../../loading-state/LoadingState'
import MemberFilters from '../../ui/MemberFilters/MemberFilters'
import './MembersPage.scss'

export default function MembersPage(props) {
    console.log('Rendering MembersPage component.')
    const loading = useMembersPageSetup()

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
