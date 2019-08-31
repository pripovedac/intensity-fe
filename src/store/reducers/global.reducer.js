import * as actions from '../actions/global.action'

const initialState = {
    week: 0,
    wodMode: 'regular'
}
// Possible wodMode, i.e. modes for page Wod, are:
// [wod, exercise, regular].

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

        case actions.WOD_MODE_SET: {
            return {...state, wodMode: 'wod'}
        }

        case actions.EXERCISE_MODE_SET: {
            return {...state, wodMode: 'exercise'}
        }

        case actions.REGULAR_MODE_SET: {
            return {...state, wodMode: 'regular'}
        }

        default: {
            return state
        }
    }
}
