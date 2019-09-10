import * as actions from '../actions/global.action'

const initialState = {
    week: 0,
    wodMode: 'regular',
    trainingId: '',
    isUpdate: false,
    memberFilter: 'all',
    activeMember: {}
}
// Possible wodMode values are [wod, exercise, regular]
// Possible memberFilter values are [all, active, inactive]

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.WEEK_SUBTRACT: {
            const decrement = state.week - 1
            return {
                ...state,
                week: decrement
            }
        }

        case actions.WEEK_ADD: {
            const increment = state.week + 1
            return {
                ...state,
                week: increment
            }
        }

        case actions.WEEK_RESET: {
            return {
                ...state,
                week: 0
            }
        }

        case actions.WOD_MODE_SET: {
            return {
                ...state,
                wodMode: 'wod'
            }
        }

        case actions.EXERCISE_MODE_SET: {
            return {
                ...state,
                wodMode: 'exercise'
            }
        }

        case actions.REGULAR_MODE_SET: {
            return {
                ...state,
                wodMode: 'regular'
            }
        }

        case actions.ACTIVE_TRAINING_ADD: {
            return {
                ...state,
                trainingId: action.payload
            }
        }

        case actions.ACTIVE_TRAINING_REMOVE: {
            return {
                ...state,
                trainingId: ''
            }
        }

        case actions.UPDATE_NOTIFY: {
            return {
                ...state,
                isUpdate: true
            }
        }

        case actions.UPDATE_NOTIFICATION_REMOVE: {
            return {
                ...state,
                isUpdate: false
            }
        }

        case actions.MEMBER_FILTER_UPDATE: {
            return {
                ...state,
                memberFilter: action.payload
            }
        }

        case actions.ACTIVE_MEMBER_SET: {
            return {
                ...state,
                activeMember: action.payload
            }
        }

        case actions.ACTIVE_MEMBER_REMOVE: {
            return {
                ...state,
                activeMember: {}
            }
        }

        default: {
            return state
        }
    }
}
