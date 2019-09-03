export function selectMode(state) {
    return state.global.wodMode
}

export function selectWeek(state) {
    return state.global.week
}

export function selectActiveTrainingId(state) {
    return state.global.trainingId
}

export function selectUpdateNotification(state) {
    return state.global.isUpdate
}
