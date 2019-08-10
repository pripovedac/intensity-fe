import storage from 'redux-persist/lib/storage'
import * as actions from '../actions/auth.action'

const initialState = {
    user: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_ACCOMPLISH: {
            return action.payload
        }

        case actions.LOGIN_ABORT: {
            alert(action.payload.message)
            return state
        }

        case actions.REGISTRATION_ACCOMPLISH: {
            const message = 'You have successfully created an acount.\n' +
                'Please wait for admin approval to login.'
            alert(message)
            return state
        }

        case actions.REGISTRATION_ABORT: {
            return state
        }

        default: {
            return state
        }
    }
}
