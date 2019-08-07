export async function login(user) {
    console.log(process.env)
    return await fetch(`${process.env.REACT_APP_BE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
}
