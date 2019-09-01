import {isEmpty} from 'lodash'

export function selectNewWod(state) {
    return state.wod.new
}

export function selectNewWodWithExercises(state) {
    return {
        ...state.wod.new,
        exercises: state.exercises.new
    }
}

export function selectActiveWodWithExercises(state) {
    if (!isEmpty(state.wod.active)) {
        return {
            ...state.wod.active,
            exercises: state.exercises.active
        }
    } else {
        return {}
    }
}

export function selectMembers(state) {
    if (!isEmpty(state.wod.active)) {
        return state.wod.active.members
    } else {
        return []
    }
}
