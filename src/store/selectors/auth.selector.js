export function selectUser(state) {
    return state.user
}

export function selectUsername(state) {
    return `${state.user.name} ${state.user.lastname}`
}
