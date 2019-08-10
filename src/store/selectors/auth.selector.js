export function selectUser(state) {
    return state.auth
}

export function selectUsername(state) {
    return `${state.auth.name} ${state.auth.lastname}`
}
