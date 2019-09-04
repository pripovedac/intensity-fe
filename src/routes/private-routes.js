import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Navigation from '../components/ui/Navigation/Navigation'
import Home from '../components/pages/Home/Home'
import Wod from '../components/pages/Wod/Wod'
import Members from '../components/pages/Members/Members'

function PrivateRoutes() {
    return (
        <div>
            <Navigation/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/wod" component={Wod}/>
                <Route path="/members" component={Members}/>
            </Switch>
        </div>
    )
}

export default PrivateRoutes
