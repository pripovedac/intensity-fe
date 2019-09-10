import {apiFetch} from '../fetch'
const path = process.env.REACT_APP_BE_URL

export async function saveWod(wodWithExercises) {
    console.log('Saving...')
    return await apiFetch('POST', `${path}/wod`, wodWithExercises)
}

export async function updateWod(wodWithExercises) {
    console.log('Updating...')
    return await apiFetch('PUT', `${path}/wod`, wodWithExercises)
}

export async function deleteWod(id) {
    return await apiFetch('DELETE', `${path}/wod/${id}`)
}
