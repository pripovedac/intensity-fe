import * as actions from '../actions/exercise.action'

const initialState = {
    active: [],
    new: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.NEW_EXERCISE_ADD: {
            return {
                ...state,
                new: [...state.new, action.payload]
            }
        }

        case actions.NEW_EXERCISE_REMOVE: {
            const newExercises = state.new.filter(exercise => exercise.name !== action.payload)
            return {
                ...state,
                new: [...newExercises]
            }
        }

        case actions.NEW_EXERCISE_CLEAN: {
            return {
                ...state,
                new: []
            }
        }

        case actions.ACTIVE_EXERCISES_ADD: {
            return {
                ...state,
                active: [...action.payload]
            }
        }

        case actions.ACTIVE_EXERCISES_REMOVE: {
            return {
                ...state,
                active: []
            }
        }

        default: {
            return state
        }
    }
}
