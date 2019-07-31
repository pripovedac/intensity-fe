function apiFetchFactory({fetch}) {
    return async function apiFetch(method, url, body, {
        contentType = 'application/json',
        hasAuthHeader = true,
        responseType = 'json'
    } = {}) {

        const res = await fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                'content-type': contentType,
            },
        })

        if (responseType == "json" && res.status >= 200 && res.status < 300)
            return res.json()
        else {
            return {errorStatus: res.status}
        }
    }
}

export const apiFetch = apiFetchFactory({fetch})
