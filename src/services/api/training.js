import {apiFetch} from '../fetch'
const path = process.env.REACT_APP_BE_URL

export async function getTraining(date) {
    return await apiFetch('GET', `${path}/trainings?date=${date}`)
}

export async function signForTraining(trainingId) {
    const payload = {
        trainingId
    }
    return await apiFetch('POST', `${path}/trainings/sign`, payload)
}

export async function signOutOfTraining( trainingId) {
    const payload = {
        trainingId
    }
    return await apiFetch('POST', `${path}/trainings/sign-out`, payload)
}
