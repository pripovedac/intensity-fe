import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import authReducer from './auth.reducer'

function rootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        global: authReducer
    })
}

export default rootReducer
