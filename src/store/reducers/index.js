import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import userReducer from './auth.reducer'

function rootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer
    })
}

export default rootReducer
