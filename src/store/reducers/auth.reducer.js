import * as actions from '../actions/auth.action'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.USER_PERSIST: {
            return {
                ...state,
                ...action.payload
            }
        }

        case actions.LOGIN_ABORT: {
            alert(action.payload.message)
            return state
        }

        case actions.REGISTRATION_ACCOMPLISH: {
            const message = 'You have successfully created an acount.\n' +
                'Please wait for admin approval to login.'
            alert(message)
            return state
        }

        case actions.REGISTRATION_ABORT: {
            alert(action.payload)
            return state
        }

        case actions.TRAININGS_ADD: {
            return {
                ...state,
                trainings: action.payload,
            }
        }

        case actions.TRAINING_NUMBER_INCREMENT: {
            return {
                ...state,
                trainingNum: state.trainingNum + 1,
            }
        }

        case actions.TRAINING_NUMBER_DECREMENT: {
            return {
                ...state,
                trainingNum: state.trainingNum - 1,
            }
        }

        default: {
            return state
        }
    }
}
