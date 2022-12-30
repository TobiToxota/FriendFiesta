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

export default getUserData;