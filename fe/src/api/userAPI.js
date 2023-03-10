/* This function fetches the backend of the userdata 
and returns either the data or the error message */
let getUserData = async (token) => {
    let response = await fetch(process.env.REACT_APP_API_URL + 'user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    })

    let data = await response.json()

    return data
}

/* This function fetches the backend with an event 
and registers a user in the database */
let registerUser = async (e) => {
    e.preventDefault()

    let response = await fetch(process.env.REACT_APP_API_URL + 'register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }),
    })

    let data = await response.json()

    return data
}

/* This function fetches the backend with an event 
and checks if the user has an account and password is right. If so, it will return a token. */
let getTokenFromBackend = async (e) => {
    e.preventDefault()

    // get the token from the api
    let response = await fetch(process.env.REACT_APP_API_URL + 'login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
        }),
    })

    let data = await response.json()

    return data
}

/* This function fetches the backend with an token 
and logs the user out on the backend */
let logoutUser = async (token) => {
    let response = await fetch(process.env.REACT_APP_API_URL + 'logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    })

    if (response.status === 204) {
        return {
            message: 'User successfully logged out',
        }
    } else {
        return {
            message: 'There was a problem logging out the user',
        }
    }
}

export { getUserData, registerUser, getTokenFromBackend, logoutUser }
