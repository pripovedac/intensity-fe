export const WEEK_SUBTRACT = 'WEEK_SUBTRACT'
export const WEEK_ADD = 'WEEK_ADD'
export const WEEK_RESET = 'WEEK_RESET'
export const WOD_MODE_SET = 'WOD_MODE_SET'
export const EXERCISE_MODE_SET = 'EXERCISE_MODE_SET'
export const REGULAR_MODE_SET = 'REGULAR_MODE_SET'
export const ACTIVE_TRAINING_ADD = 'ACTIVE_TRAINING_ADD'
export const ACTIVE_TRAINING_REMOVE = 'ACTIVE_TRAINING_REMOVE'
export const UPDATE_NOTIFY = 'UPDATE_NOTIFY'
export const UPDATE_NOTIFICATION_REMOVE = 'UPDATE_NOTIFICATION_REMOVE'
export const MEMBER_FILTER_UPDATE = 'MEMBER_FILTER_UPDATE'
export const ACTIVE_MEMBER_SET = 'ACTIVE_MEMBER_SET'
export const ACTIVE_MEMBER_REMOVE = 'ACTIVE_MEMBER_REMOVE'

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

export function addActiveTraining(trainingId) {
    return {
        type: ACTIVE_TRAINING_ADD,
        payload: trainingId
    }
}

export function removeActiveTraining() {
    return {
        type: ACTIVE_TRAINING_REMOVE
    }
}

export function notifyUpdate() {
    return {
        type: UPDATE_NOTIFY
    }
}

export function removeUpdateNotification() {
    return {
        type: UPDATE_NOTIFICATION_REMOVE
    }
}

export function updateMemberFilter(filter) {
    return {
        type: MEMBER_FILTER_UPDATE,
        payload: filter
    }
}

export function setActiveMember(member) {
    return {
        type: ACTIVE_MEMBER_SET,
        payload: member
    }
}

export function removeActiveMember() {
    return {
        type: ACTIVE_MEMBER_REMOVE
    }
}

