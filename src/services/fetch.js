import {getToken} from './localstorage'

function apiFetchFactory({fetch}) {
    return async function apiFetch(method, url, body, {
        contentType = 'application/json',
        hasAuthHeader = true,
        responseType = 'json'
    } = {}) {

        //todo: read accessToken from the store
        const accessToken = getToken()

        console.log('Fetching...')

        const res = await fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                ...(hasAuthHeader ? {'authorization': 'Bearer ' + accessToken} : {}),
                'content-type': contentType,
            },
        })

        if (responseType === "json" && res.status >= 200 && res.status < 300) {
            return res.json()
        } else {
            return {
                errorStatus: res.status,
                exception: await res.json()
            }
        }
    }
}

export const apiFetch = apiFetchFactory({fetch})
