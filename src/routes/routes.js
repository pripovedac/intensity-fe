import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from '../components/pages/Login/LoginPage'
import Register from '../components/pages/Register/RegisterPage'
import Navigation from '../components/ui/Navigation/Navigation'
import HomePage from '../components/pages/Home/HomePage'
import Wod from '../components/pages/Wod/WodPage'
import MembersPage from '../components/pages/Members/MembersPage'
import ProfilePage from '../components/pages/Profile/ProfilePage'
import {selectUser} from '../store/selectors/auth.selector'
import {useSelectorWrapper} from '../components/custom-hooks/useReduxHooks'

function Routes() {
    const user = useSelectorWrapper(selectUser)

    const publicRoutes =
        <div>
            <Switch>
                {/*todo: chech if at exists*/}
                <Redirect exact from='/' to='/login'/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>

    const privateRoutes =
        <div>
            <Navigation/>
            <Switch>
                <Redirect exact from='/' to='/home'/>
                <Route path="/home" component={HomePage}/>
                <Route path="/wod" component={Wod}/>
                <Route path="/members" component={MembersPage}/>
                <Route path="/profile" component={ProfilePage}/>
            </Switch>
        </div>

    return user.token
        ? privateRoutes
        : publicRoutes
}

export default Routes
