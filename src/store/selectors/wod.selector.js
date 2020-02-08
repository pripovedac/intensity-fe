import {isEmpty} from 'lodash'

export function selectNewWod(state) {
    return state.wod.new
}

export function selectNewWodWithExercises(state) {
    const wod = state.wod.new;
    return {

        ...wod,
        // duration: parseInt(wod.duration),
        // roundNumber: parseInt(wod.roundNumber),
        exercises: state.exercises.new
    }
}

export function selectActiveWod(state) {
    if (!isEmpty(state.wod.active)) {
        return state.wod.active
    } else {
        return {}
    }
}

export function selectMembers(state) {
    if (!isEmpty(state.wod.active)) {
        return state.wod.active.users
    } else {
        return []
    }
}
