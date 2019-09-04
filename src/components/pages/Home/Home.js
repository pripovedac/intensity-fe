import React from 'react'
import Calendar from '../../ui/Calendar/Calendar'
import WeeklyNavigation from '../../ui/WeeklyNavigation/WeeklyNavigation'

function Home() {
    return (
        <div>
            <Calendar title="Intensity calendar"/>
            <WeeklyNavigation/>
        </div>
    )
}

export default Home
