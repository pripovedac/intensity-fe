export const NEW_WOD_ADD = 'NEW_WOD_ADD'
export const WOD_SUBMIT = 'WOD_SUBMIT'
export const WOD_SUBMIT_ACCOMPLISH = 'WOD_SUBMIT_ACCOMPLISH'
export const WOD_SUBMIT_ABORT = 'WOD_SUBMIT_ABORT'
export const NEW_WOD_CLEAN = 'NEW_WOD_CLEAN'
export const ACTIVE_WOD_ADD = 'ACTIVE_WOD_ADD'
export const ACTIVE_WOD_REMOVE = 'ACTIVE_WOD_REMOVE'
export const NEW_MEMBER_ADD = 'NEW_MEMBER_ADD'
export const MEMBER_REMOVE = 'MEMBER_REMOVE'

export function addNewWod(wod) {
    return {
        type: NEW_WOD_ADD,
        payload: wod
    }
}

export function submitWod(wodWithExercises) {
    return {
        type: WOD_SUBMIT,
        payload: wodWithExercises
    }
}

export function accomplishWodSubmit() {
    return {
        type: WOD_SUBMIT_ACCOMPLISH,
    }
}

export function abortWodSubmit(message) {
    return {
        type: WOD_SUBMIT_ABORT,
        payload: message
    }
}

export function cleanNewWod() {
    return {
        type: NEW_WOD_CLEAN,
    }
}

export function addActiveWod(wod) {
    return {
        type: ACTIVE_WOD_ADD,
        payload: wod
    }
}

export function removeActiveWod() {
    return {
        type: ACTIVE_WOD_REMOVE,
    }
}

export function addNewMember(memberName) {
    return {
        type: NEW_MEMBER_ADD,
        payload: memberName
    }
}

export function removeMember(memberId) {
    return {
        type: MEMBER_REMOVE,
        payload: memberId
    }
}
