import {apiFetch} from '../fetch'

const path = process.env.REACT_APP_BE_URL

export async function getAllMembers() {
    console.log('Getting all users...')
    return await apiFetch('GET', `${path}/user`)
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

export async function getAvatar(userId, setPictureUrl) {
    await fetch(`${path}/user/${userId}/avatar`, {method: 'GET'})
        .then(response => {
            return response.body.getReader()
        })
        .then(reader => new ReadableStream({
                start(controller) {
                    return pump();

                    function pump() {
                        return reader.read().then(({done, value}) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        )
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => setPictureUrl(URL.createObjectURL(blob)))
        .catch(err => alert('Image could not be loaded.'));
}
