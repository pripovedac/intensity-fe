import * as actions from '../actions/wod.action'

const initialState = {
    active: {},
    new: {
        globalType: '',
        name: '',
        date: '',
        duration: '',
        roundNumber: '',
        trainingType: '',
        trainer: ''
    }
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
