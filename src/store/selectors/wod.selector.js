export function selectWodWithExercises(state) {
    return {
        ...state.wod,
        exercises: state.exercises
    }
}
