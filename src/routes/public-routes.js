import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from '../components/pages/Login/Login'
import Register from '../components/pages/Register/Register'

function PublicRoutes() {
    return (
        <div>
            <Switch>
                {/*todo: chech if at exists*/}
                <Redirect exact from='/' to='/login'/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
    )
}

export default PublicRoutes
