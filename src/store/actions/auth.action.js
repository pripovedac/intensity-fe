export const USER_LOGIN = 'USER_LOGIN'
export const LOGIN_ACCOMPLISH = 'LOGIN_ACCOMPLISH'
export const LOGIN_ABORT = 'LOGIN_ABORT'
export const USER_REGISTER = 'USER_REGISTER'
export const REGISTRATION_ACCOMPLISH = 'REGISTRATION_ACCOMPLISH'
export const REGISTRATION_ABORT = 'REGISTRATION_ABORT'

export function loginUser(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export function accomplishLogin(user) {
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

export function registerUser(user) {
    return {
        type: USER_REGISTER,
        payload: user
    }
}

export function accomplishRegistration(user) {
    return {
        type: REGISTRATION_ACCOMPLISH,
        payload: user
    }
}

export function abortRegistration(message) {
    return {
        type: REGISTRATION_ABORT,
        payload: message
    }
}

