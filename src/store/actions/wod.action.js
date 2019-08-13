export const WOD_ADD = 'WOD_ADD'

export function addWod(wod) {
    return {
        type: WOD_ADD,
        payload: wod
    }
}
