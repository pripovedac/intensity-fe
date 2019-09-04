import {apiFetch} from '../fetch'
const path = process.env.REACT_APP_BE_URL

export async function getAllMembers() {
    console.log('Getting all users...')
    return await apiFetch('GET', `${path}/user`)
}
