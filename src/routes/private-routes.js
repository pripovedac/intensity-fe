import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Navigation from '../components/ui/Navigation/Navigation'
import HomePage from '../components/pages/Home/HomePage'
import Wod from '../components/pages/Wod/WodPage'
import MembersPage from '../components/pages/Members/MembersPage'
import ProfilePage from '../components/pages/Profile/ProfilePage'

function PrivateRoutes() {
    return (
        <div>
            <Navigation/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/wod" component={Wod}/>
                <Route path="/members" component={MembersPage}/>
                <Route path="/profile" component={ProfilePage}/>
            </Switch>
        </div>
    )
}

export default PrivateRoutes
