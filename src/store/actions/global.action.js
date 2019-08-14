export const WEEK_SUBTRACT = 'WEEK_SUBTRACT'
export const WEEK_ADD = 'WEEK_ADD'
export const WEEK_RESET = 'WEEK_RESET'
export const WOD_MODE_SET = 'WOD_MODE_SET'
export const EXERCISE_MODE_SET = 'EXERCISE_MODE_SET'
export const REGULAR_MODE_SET = 'REGULAR_MODE_SET'

export function subtractWeek() {
    return {
        type: WEEK_SUBTRACT
    }
}

export function addWeek() {
    return {
        type: WEEK_ADD
    }
}

export function resetWeek() {
    return {
        type: WEEK_RESET
    }
}

export function setWodMode() {
    return {
        type: WOD_MODE_SET
    }
}

export function setExerciseMode() {
    return {
        type: EXERCISE_MODE_SET
    }
}

export function setRegularMode() {
    return {
        type: REGULAR_MODE_SET
    }
}
