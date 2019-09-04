import * as actions from '../actions/members.action'

const initialState = {
    allMembers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.MEMBERS_SET: {
            return action.payload
        }

        default: {
            return state
        }
    }
}
