import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from '../components/pages/Login/LoginPage'
import Register from '../components/pages/Register/RegisterPage'

function PublicRoutes() {
    return (
        <div>
            <Switch>
                {/*todo: chech if at exists*/}
                <Redirect exact from='/' to='/login'/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
    )
}

export default PublicRoutes
