import React from 'react'
import Navigation from '../../ui/Navigation/Navigation.js'
import Calendar from '../../ui/Calendar/Calendar'

function Home() {
    return (
        <div>
            <Navigation/>
            <Calendar title="Intensity calendar"/>
        </div>
    )
}

export default Home
