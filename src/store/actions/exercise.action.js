export const NEW_EXERCISE_ADD = 'NEW_EXERCISE_ADD'
export const NEW_EXERCISE_REMOVE = 'NEW_EXERCISE_REMOVE'
export const NEW_EXERCISE_CLEAN = 'NEW_EXERCISE_CLEAN'

export function addNewExercise(exercise) {
    return {
        type: NEW_EXERCISE_ADD,
        payload: exercise
    }
}

export function removeNewExercise(exerciseName) {
    return {
        type: NEW_EXERCISE_REMOVE,
        payload: exerciseName
    }
}

export function cleanNewExercises() {
    return {
        type: NEW_EXERCISE_CLEAN,
    }
}
