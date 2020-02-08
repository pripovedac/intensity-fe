import {apiFetch} from '../fetch'
import { getToken } from '../localstorage'

const path = process.env.REACT_APP_BE_URL

export async function getAllMembers() {
    console.log('Getting all users...')
    return await apiFetch('GET', `${path}/users`)
}

export async function getSingleMember(id) {
    console.log('Getting single user...')
    return await apiFetch('GET', `${path}/users/${id}`)
}

export async function changeMemberStatus(user) {
    return await apiFetch('PUT', `${path}/users/status`, user)
}

function provideData(formData) {
    return {
        method: 'POST',
        body: formData,
        headers: {'authorization': 'Bearer ' + getToken()},
    }
}

export async function uploadAvatar(userId, avatar) {
    const formData = new FormData()
    formData.append('avatar', avatar)
    // Content-Type header MUST NOT be exist!
    return await fetch(`${path}/users/avatar`, provideData(formData))
}

export async function updateUser(user) {
    return await apiFetch('PUT', `${path}/users`, user)
}

export async function deleteUser(id) {
    return await apiFetch('DELETE', `${path}/users/${id}`)
}

export async function addUserPayment(id) {
    return await apiFetch('PUT', `${path}/users/${id}/payment`)
}
