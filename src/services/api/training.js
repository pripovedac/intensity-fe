import {apiFetch} from '../fetch'
const path = process.env.REACT_APP_BE_URL

export async function getTraining(date) {
    console.log('date in getTraining: ', date)
    return await apiFetch('GET', `${path}/training?date=${date}`)
}
