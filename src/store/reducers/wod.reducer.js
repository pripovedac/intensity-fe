import * as actions from '../actions/wod.action'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.WOD_ADD: {
            return action.payload
        }

        default: {
            return state
        }
    }
}
