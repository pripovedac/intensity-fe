export const MEMBERS_SET = 'MEMBERS_SET'
export const MEMBER_STATUS_CHANGE = 'MEMBER_STATUS_CHANGE'
export const MEMBER_PERSIST = 'MEMBER_PERSIST'

export function setMembers(members) {
    return {
        type: MEMBERS_SET,
        payload: members
    }
}

export function changeMemberStatus(member) {
    return {
        type: MEMBER_STATUS_CHANGE,
        payload: member
    }
}

export function persistMember(member) {
    return {
        type: MEMBER_PERSIST,
        payload: member
    }
}
