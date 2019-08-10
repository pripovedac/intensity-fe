import * as actions from '../actions/global.action'

const initialState = {
    week: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.WEEK_SUBTRACT: {
            const decrement = state.week - 1
            return {...state, week: decrement}
        }

        case actions.WEEK_ADD: {
            const increment = state.week + 1
            return {...state, week: increment}
        }

        case actions.WEEK_RESET: {
            return {...state, week: 0}
        }

        default: {
            return state
        }
    }
}
