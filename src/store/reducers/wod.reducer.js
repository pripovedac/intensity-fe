import * as actions from '../actions/wod.action'

const newWod = {
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
        case actions.WOD_ADD: {
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
            console.log('out of active')
        }

        case actions.ACTIVE_WOD_REMOVE: {
            return {
                ...state,
                active:{}
            }
        }

        default: {
            return state
        }
    }
}
