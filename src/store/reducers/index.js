import {combineReducers} from 'redux'
import userReducer from './auth.reducer'

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer
