import {apiFetch} from '../fetch'
const path = process.env.REACT_APP_BE_URL

export async function saveWod(wodWithExercises) {
    console.log('Saving...')
    return await apiFetch('POST', `${path}/wods`, wodWithExercises)
}

export async function updateWod(wodWithExercises, id) {
    console.log('Updating...')
    return await apiFetch('PUT', `${path}/wods/${id}`, wodWithExercises)
}

export async function deleteWod(id) {
    return await apiFetch('DELETE', `${path}/wods/${id}`)
}
