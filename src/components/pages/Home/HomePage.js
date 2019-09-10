import React from 'react'
import Calendar from '../../ui/Calendar/Calendar'
import WeeklyNavigation from '../../ui/WeeklyNavigation/WeeklyNavigation'

export default function HomePage() {


    return (
        <div>
            <Calendar title="Intensity calendar"/>
            <WeeklyNavigation/>
        </div>
    )
}
