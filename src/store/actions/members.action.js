export const MEMBERS_SET = 'MEMBERS_SET'

export function setMembers(members) {
    return {
        type: MEMBERS_SET,
        payload: members
    }
}
