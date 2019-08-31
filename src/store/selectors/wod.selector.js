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
    return {
        ...state.wod.active,
        exercises: state.exercises.active
    }
}
