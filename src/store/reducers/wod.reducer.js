import * as actions from '../actions/wod.action'

const initialState = {
    active: {},
    new: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.WOD_ADD: {
            return {
                ...state,
                new: action.payload
            }
        }

        case actions.WOD_SUBMIT_ABORT: {
            return state
        }

        default: {
            return state
        }
    }
}
