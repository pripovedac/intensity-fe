export const USER_LOGIN = 'USER_LOGIN'
export const LOGIN_ACCOMPLISH = 'LOGIN_ACCOMPLISH'
export const LOGIN_ABORT = 'LOGIN_ABORT'

export function loginUser(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export function loginAccomplish(user) {
    return {
        type: LOGIN_ACCOMPLISH,
        payload: user
    }
}

export function abortLogin(message) {
    return {
        type: LOGIN_ABORT,
        payload: message
    }
}
