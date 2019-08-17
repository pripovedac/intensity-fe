export function selectNewWod(state) {
    return state.wod.new
}


export function selectNewWodWithExercises(state) {
    return {
        ...state.wod,
        exercises: state.exercises.new
    }
}
