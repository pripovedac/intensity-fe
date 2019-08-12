import * as actions from '../actions/exercise.action'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.EXERCISE_ADD: {
            return [...state, action.payload]
        }

        default: {
            return state
        }
    }
}
