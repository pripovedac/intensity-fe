import * as actions from '../actions/global.action'

const initialState = {
    week: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.WEEK_SUBSTRACT: {
            return --state
        }

        case actions.WEEK_ADD: {
            return ++state
        }

        case actions.WEEK_RESET: {
            return 0
        }

        default: {
            return state
        }
    }
}
