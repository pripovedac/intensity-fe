export const LOAD_STATE_SET = 'LOAD_STATE_SET'
export const IMAGE_URL_SET = 'IMAGE_URL_SET'
export const IMAGE_MODE_SET = 'IMAGE_MODE_SET'

export function setLoadState(isLoaded) {
    return {
        type: LOAD_STATE_SET,
        payload: isLoaded
    }
}

export function setImageUrl(url) {
    return {
        type: IMAGE_URL_SET,
        payload: url
    }
}

export function setImageMode(mode) {
    return {
        type: IMAGE_MODE_SET,
        payload: mode
    }
}
