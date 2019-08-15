export function selectNewWodWithExercises(state) {
    return {
        ...state.wod,
        exercises: state.exercises.new
    }
}
