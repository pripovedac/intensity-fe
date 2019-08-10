export const WEEK_SUBTRACT = 'WEEK_SUBTRACT'
export const WEEK_ADD = 'WEEK_ADD'
export const WEEK_RESET = 'WEEK_RESET'

export function subtractWeek(user) {
    return {
        type: WEEK_SUBTRACT
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
