import {apiFetch} from '../fetch'
const path = process.env.REACT_APP_BE_URL

export async function saveWod(wodWithExercises) {
    return await apiFetch('POST', `${path}/wod`, wodWithExercises)
}
