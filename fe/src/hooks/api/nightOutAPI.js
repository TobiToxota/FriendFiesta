import { useState, useEffect } from "react"

/* this custom hook fetches the backend and creates a nightOut Object in the database */
const useCreateNightOut = (token) => {
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState("");

    async function createNightOut(e) {
        e.preventDefault()

        // Error Handling
        if (e.target.title.value < 2) {
            setError('Please enter a title, or at least 2 characters.')
            return { data, success, error }
        }

        let response = await fetch(process.env.REACT_APP_API_URL + "nightoutlist/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`
            },
            body: JSON.stringify({
                title: e.target.title.value
            }),
        });
        let thisData = await response.json()

        // check the response
        if (response.status === 201) {
            setSuccess('Your nightout is beeing created')
            setData(thisData)
            // send user to the new nightout
            setTimeout(function () { window.location.href = "/nightout/" + thisData.uuid; }, 3050)
        } else {
            setError('Something went wrong')
            setData(thisData)
        }
    }
    return { data, error, setError, success, createNightOut }
}

/* this custom hook fetches the bakend for the data of the nighOut */
const useGetNightOut = (token, uuid) => {
    const [data, setData] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    async function getNightOut(uuid) {

        let response = await fetch(process.env.REACT_APP_API_URL + "nightout/" + uuid , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`
            }
        });
        let thisData = await response.json()

        if (response.status === 200) {
            setData(thisData)
            setSuccess('Nightout Loaded')
        } else {
            setError('You are not participating in this nightOut')
            setData(thisData)
        }
    }

    useEffect(() => {
        getNightOut(uuid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[uuid, token])

    return { data, error, setError, success }
}

export { useCreateNightOut, useGetNightOut }