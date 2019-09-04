import * as actions from '../actions/members.action'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.MEMBERS_SET: {
            return action.payload
        }

        case actions.MEMBER_PERSIST: {
            return state.map(member => {
                    if (member.id === action.payload.id) {
                        return action.payload
                    } else {
                        return member
                    }
                }
            )
        }

        default: {
            return state
        }
    }
}
