import * as actions from '../actions/index'

export default function (state = null, action) {
    switch (action.type) {
        case actions.USER_LOGIN: {
            return action.payload
        }

        case actions.LOGIN_ACCOMPLISH: {
            return action.payload
        }

        case actions.LOGIN_ABORT: {
            alert(action.payload.message)
            return state
        }

        default: {
            return state
        }
    }
}
