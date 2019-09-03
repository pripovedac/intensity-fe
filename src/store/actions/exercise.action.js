export const NEW_EXERCISE_ADD = 'NEW_EXERCISE_ADD'
export const NEW_EXERCISE_REMOVE = 'NEW_EXERCISE_REMOVE'
export const NEW_EXERCISE_CLEAN = 'NEW_EXERCISE_CLEAN'
export const ACTIVE_EXERCISES_ADD = 'ACTIVE_EXERCISES_ADD'
export const ACTIVE_EXERCISES_REMOVE = 'ACTIVE_EXERCISES_REMOVE'
export const NEW_EXERCISES_REPLACE = 'NEW_EXERCISES_REPLACE'


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
        type: NEW_EXERCISE_CLEAN
    }
}

export function addActiveExercises(exercises) {
    return {
        type: ACTIVE_EXERCISES_ADD,
        payload: exercises
    }
}

export function removeActiveExercises(exercises) {
    return {
        type: ACTIVE_EXERCISES_REMOVE
    }
}

export function replaceNewExercises(exercises) {
    return {
        type: NEW_EXERCISES_REPLACE,
        payload: exercises
    }
}
