import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import globalReducer from './global.reducer'
import storage from 'redux-persist/es/storage'
import {persistReducer} from 'redux-persist'
import * as actions from '../actions/auth.action'

const persistConfig = {
    key: 'root',
    storage
}

const appReducer = combineReducers({
    auth: authReducer,
    global: globalReducer
})

const rootReducer = function (state, action) {
    if (action.type === actions.LOGOUT_ACCOMPLISH) {
        storage.removeItem(`persist:${persistConfig.key}`)
        // It's not mutation. It's changing the reference.
        state = undefined
    }

    return appReducer(state, action)
}

export default persistReducer(persistConfig, rootReducer)
