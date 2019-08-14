export function selectWodWithExercises(state) {
    console.log('qweqwqwe: ',     {    ...state.wod,
        exercises: state.exercises})
    return {
        ...state.wod,
        exercises: state.exercises
    }
}
