export function selectNewExercises(state) {
    return state.exercises.new
}

export function selectActiveExercises(state) {
    if (state.exercises.active.length) {
            return state.exercises.active
    } else {
        return []
    }
}
