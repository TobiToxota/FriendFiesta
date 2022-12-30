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
        return data

    } else {
        // if there is a problem, log out the user
        return data['message']
    }
};

/* This function fetches the backend with am event 
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
      return data['token']

    // some error, return the error
    } else {
      return Object.values(data)[0]
    }
}

export {getUserData, registerUser}