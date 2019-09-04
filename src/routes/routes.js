import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../components/pages/Login/Login'
import Register from '../components/pages/Register/Register'
import Home from '../components/pages/Home/Home'
import Wod from '../components/pages/Wod/Wod'
import Members from '../components/pages/Members/Members'

function Routes() {
    return(
        <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/wod" component={Wod} />
            <Route path="/members" component={Members} />
        </Switch>
    )
}

export default Routes
