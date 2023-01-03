/* this function fetches the backend and creates a nightOut Object in the database */
let createNightOut = async (e, token) => {
    e.preventDefault()

    // Error Handling
    if (e.target.nightOutName.value.length < 2) {
        return ({ "error": "Please enter a title, or at least 2 characters." })
    }

    let response = await fetch(process.env.REACT_APP_API_URL + "nightoutlist/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
        body: JSON.stringify({
            title: e.target.nightOutName.value
        }),
    });
    let data = await response.json()

    // check the response
    if (response.status === 201) {
        return ({
            "success": "Your nightOut was created.",
            "uuid": data.uuid
        })
    } else {
        return ({
            "error": "Something went wrong."
        })
    }
}

export {createNightOut}