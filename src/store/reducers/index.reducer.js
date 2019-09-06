import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import globalReducer from './global.reducer'
import exerciseReducer from './exercise.reducer'
import wodReducer from './wod.reducer'
import membersReducer from './members.reducer'
import imageReducer from './image.reducer'
import storage from 'redux-persist/es/storage'
import {persistReducer} from 'redux-persist'
import * as actions from '../actions/auth.action'

const persistConfig = {
    key: 'root',
    storage
}

const appReducer = combineReducers({
    user: authReducer,
    global: globalReducer,
    exercises: exerciseReducer,
    wod: wodReducer,
    allMembers: membersReducer,
    image: imageReducer,
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
