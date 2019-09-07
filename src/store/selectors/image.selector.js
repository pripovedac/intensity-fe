export function selectImageLoadStatus(state) {
    return state.image.isLoaded
}

export function selectImageUrl(state) {
    return state.image.url
}

export function selectImageMode(state) {
    return state.image.mode
}
