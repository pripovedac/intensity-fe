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
            console.log('remove')
            const newExercises = state.new.filter(exercise => exercise.name !== action.payload)
            return {
                ...state,
                new: [...newExercises]
            }
        }

        default: {
            return state
        }
    }
}
