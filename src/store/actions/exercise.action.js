export const EXERCISE_ADD = 'EXERCISE_ADD'

export function addExercise(exercise) {
    return {
        type: EXERCISE_ADD,
        payload: exercise
    }
}
