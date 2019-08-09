export const WEEK_SUBSTRACT = 'WEEK_SUBSTRACT'
export const WEEK_ADD = 'WEEK_ADD'
export const WEEK_RESET = 'WEEK_RESET'

export function substractWeek(user) {
    return {
        type: WEEK_SUBSTRACT
    }
}

export function addWeek(user) {
    return {
        type: WEEK_ADD
    }
}

export function resetWeek(user) {
    return {
        type: WEEK_RESET
    }
}
