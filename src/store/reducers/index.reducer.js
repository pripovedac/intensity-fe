import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import authReducer from './auth.reducer'
import globalReducer from './global.reducer'

function rootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        global: globalReducer
    })
}

export default rootReducer
