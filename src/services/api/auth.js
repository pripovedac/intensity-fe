const path = process.env.REACT_APP_BE_URL

function giveInstructions(user) {
    return {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    }
}

export async function login(user) {
    return await fetch(`${path}/login`, giveInstructions(user))
}

export async function register(user) {
    return await fetch(`${path}/register`, giveInstructions(user))
}

