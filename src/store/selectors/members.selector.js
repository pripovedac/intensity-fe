export function selectAllMembers(state) {
    const filter = state.global.memberFilter
    if (filter === 'all') {
        return state.allMembers
    } else if (filter === 'active') {
        return state.allMembers.filter(({isActive}) => isActive)
    } else {
        return state.allMembers.filter(({isActive}) => !isActive)
    }
}
