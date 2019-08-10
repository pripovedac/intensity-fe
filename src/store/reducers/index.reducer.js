import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import globalReducer from './global.reducer'

function rootReducer(history) {
    return combineReducers({
        auth: authReducer,
        global: globalReducer
    })
}

export default rootReducer
