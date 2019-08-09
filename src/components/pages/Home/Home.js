import React from 'react'
import Navigation from '../../ui/Navigation/Navigation.js'
import Calendar from '../../ui/Calendar/Calendar'
import WeeklyNavigation from '../../ui/WeeklyNavigation/WeeklyNavigation'

function Home() {
    return (
        <div>
            <Navigation/>
            <Calendar title="Intensity calendar"/>
            <WeeklyNavigation/>
        </div>
    )
}

export default Home
