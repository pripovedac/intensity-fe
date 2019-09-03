import * as actions from '../actions/wod.action'

const newWod = {
    id: '',
    globalType: '',
    name: '',
    date: '',
    duration: '',
    roundNumber: '',
    trainingType: '',
    trainer: ''
}

const initialState = {
    active: {},
    new: {...newWod}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.NEW_WOD_ADD: {
            return {
                ...state,
                new: action.payload
            }
        }

        case actions.WOD_SUBMIT_ABORT: {
            return state
        }

        case actions.NEW_WOD_CLEAN: {
            return {
                ...state,
                new: {...newWod}
            }
        }

        case actions.ACTIVE_WOD_ADD: {
            return {
                ...state,
                active: action.payload
            }
        }

        case actions.ACTIVE_WOD_REMOVE: {
            return {
                ...state,
                active:{}
            }
        }

        case actions.NEW_MEMBER_ADD: {
            const activeMembers = [...state.active.members]
            const modifiedMembers = [...activeMembers, action.payload]

            return {
                ...state,
                active: {
                    ...state.active,
                    members: [...modifiedMembers]
                }
            }
        }

        case actions.MEMBER_REMOVE: {
            const activeMembers = [...state.active.members]
            const modifiedMembers = activeMembers.filter(({id}) => id != action.payload)

            return {
                ...state,
                active: {
                    ...state.active,
                    members: [...modifiedMembers]
                }
            }
        }
        default: {
            return state
        }
    }
}
