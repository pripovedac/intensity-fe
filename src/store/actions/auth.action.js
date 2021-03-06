export const USER_LOGIN = 'USER_LOGIN'
export const USER_PERSIST = 'USER_PERSIST'
export const LOGIN_ABORT = 'LOGIN_ABORT'
export const USER_LOGOUT = 'USER_LOGOUT'
export const LOGOUT_ACCOMPLISH = 'LOGOUT_ACCOMPLISH'
export const USER_REGISTER = 'USER_REGISTER'
export const REGISTRATION_ACCOMPLISH = 'REGISTRATION_ACCOMPLISH'
export const REGISTRATION_ABORT = 'REGISTRATION_ABORT'
export const TRAININGS_ADD = 'TRAININGS_ADD'
export const TRAINING_NUMBER_INCREMENT = 'TRAINING_NUMBER_INCREMENT'
export const TRAINING_NUMBER_DECREMENT = 'TRAINING_NUMBER_DECREMENT'

export function loginUser(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export function persistUser(user) {
    return {
        type: USER_PERSIST,
        payload: user
    }
}

export function abortLogin(message) {
    return {
        type: LOGIN_ABORT,
        payload: message
    }
}

export function accomplishLogout(message) {
    return {
        type: LOGOUT_ACCOMPLISH,
    }
}

export function registerUser(user) {
    return {
        type: USER_REGISTER,
        payload: user
    }

}

export function logoutUser() {
    return {
        type: USER_LOGOUT
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

export function addTrainings(trainingIds) {
    return {
        type: TRAININGS_ADD,
        payload: trainingIds
    }
}

export function incrementTrainingNumber() {
    return {
        type: TRAINING_NUMBER_INCREMENT,
    }
}

export function decrementTrainingNumber() {
    return {
        type: TRAINING_NUMBER_DECREMENT,
    }
}

