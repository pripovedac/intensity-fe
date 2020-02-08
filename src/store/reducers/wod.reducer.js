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
    active: { members: []},
    new: {...newWod}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.NEW_WOD_ADD: {
            return {
                ...state,
                new: {
                    ...state.new,
                    ...action.payload
                }
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
                active: {
                    ...state.active,
                    ...action.payload
                }
            }
        }

        case actions.ACTIVE_WOD_REMOVE: {
            return {
                ...state,
                active: {}
            }
        }

        case actions.NEW_MEMBER_ADD: {
            console.log('action.payload: ', action.payload)
            console.log('STATE.ACTIVE: ', state.active)
            const activeMembers = [...state.active.users]
            const modifiedMembers = [...activeMembers, action.payload]

            return {
                ...state,
                active: {
                    ...state.active,
                    users: [...modifiedMembers]
                }
            }
        }

        case actions.MEMBER_REMOVE: {
            const activeMembers = [...state.active.users]
            const modifiedMembers = activeMembers.filter(({id}) => id !== action.payload)
            console.log('activeMembers: ', activeMembers)
            console.log('modifiedMembers: ', modifiedMembers)
            return {
                ...state,
                active: {
                    ...state.active,
                    users: [...modifiedMembers]
                }
            }
        }
        default: {
            return state
        }
    }
}
