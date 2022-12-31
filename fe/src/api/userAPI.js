/* This function fetches the backend of the userdata 
and returns either the data or the error message */
let getUserData = async (token) => {
    let response = await fetch(process.env.REACT_APP_API_URL + "user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    });

    let data = await response.json();

    if (response.status === 200) {
        // return the userdata
        console.log(data)
        return data

    } else {
        // if there is a problem, log out the user
        console.log(data)
        return data
    }
};

/* This function fetches the backend with an event 
and registers a user in the database */
let registerUser = async (e) => {
    e.preventDefault();

    let response = await fetch(process.env.REACT_APP_API_URL + "register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }),
    });

    let data = await response.json();

    // response is ok, return the token
    if (response.status === 201) {
        return data

        // some error, return the error
    } else {
        return data
    }
}

/* This function fetches the backend with an event 
and checks if the user has an account and password is right. If so, it will return a token. */
let getTokenFromBackend = async (e) => {
    e.preventDefault();

    // get the token from the api
    let response = await fetch(process.env.REACT_APP_API_URL + "login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
        }),
    });

    let data = await response.json();

    // if the response is ok return the token otherweise return null
    if (response.status === 200) {
        return data
    } else {
        return data
    }
}

export { getUserData, registerUser, getTokenFromBackend }