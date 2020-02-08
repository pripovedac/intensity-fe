export function selectUser(state) {
    return state.user
}

export function selectUserId(state) {
    return state.user.id
}

export function selectUsername(state) {
    return `${state.user.name} ${state.user.lastName}`
}

export function selectName(state) {
    return state.user.name
}

export function selectUserRole(state) {
    return state.user.role
}

export function selectUserTrainings(state) {
    return state.user.trainings
}
