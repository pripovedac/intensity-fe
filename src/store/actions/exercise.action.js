export const EXERCISE_ADD = 'EXERCISE_ADD'
export const EXERCISE_REMOVE = 'EXERCISE_REMOVE'

export function addExercise(exercise) {
    return {
        type: EXERCISE_ADD,
        payload: exercise
    }
}

export function removeExercise(exerciseName) {
    return {
        type: EXERCISE_REMOVE,
        payload: exerciseName
    }
}
