import * as actions from '../actions/index'

export default function (state = null, action) {
    switch (action.type) {
        case actions.USER_LOGIN: {
            console.log('action.payload: ', action.payload)
            return action.payload
        }

        case actions.LOGIN_ACCOMPLISH: {
            console.log('good', action.payload)
            return action.payload
        }

        case actions.LOGIN_ABORT: {
            console.log('abort')
            return
        }

        default: {
            return state
        }
    }
}
