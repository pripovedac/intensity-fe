import {apiFetch} from '../fetch'

const path = process.env.REACT_APP_BE_URL

export async function getAllMembers() {
    console.log('Getting all users...')
    return await apiFetch('GET', `${path}/user`)
}

export async function getSingleMember(id) {
    console.log('Getting single user...')
    return await apiFetch('GET', `${path}/user/${id}`)
}

export async function changeMemberStatus(user) {
    return await apiFetch('PUT', `${path}/user/status`, user)
}

function provideData(formData) {
    return {
        method: 'PUT',
        body: formData,
    }
}

export async function uploadAvatar(userId, avatar) {
    const formData = new FormData()
    formData.append('file', avatar)
    // Content-Type header MUST NOT be exist!
    return await fetch(`${path}/user/${userId}/avatar`, provideData(formData))
}

export async function updateUser(user) {
    return await apiFetch('PUT', `${path}/user`, user)
}

export async function deleteUser(id) {
    return await apiFetch('DELETE', `${path}/user/${id}`)
}
