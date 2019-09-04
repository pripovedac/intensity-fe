import React, {useState, useEffect} from 'react'
import StatusButton from '../Button/StatusButton/StatusButton'
import {useDispatch} from 'react-redux'
import {updateMemberFilter} from '../../../store/actions/global.action'
import './MemberFilters.scss'

function MemberFilters() {
    const [filter, setFilter] = useState('all')
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(updateMemberFilter(filter))
    }, [filter, dispatch])

    return (
        <div className="member-filters">
            <StatusButton
                class="all"
                text="All"
                onClick={() => setFilter('all')}/>
            <StatusButton
                class="active"
                text="Active"
                onClick={() => setFilter('active')}/>
            <StatusButton
                class="inactive"
                text="Inactive"
                onClick={() => setFilter('inactive')}/>
        </div>
    )
}

export default MemberFilters
