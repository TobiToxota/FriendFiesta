/** @format */

import { useState } from 'react'

/** this custom hook fetches the backend to add an user to a nightout as a participant*/
const useAddParticipantToNightOut = (token, uuid, refreshNightOut) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [data, setData] = useState(null)

    const addParticipantToNightOut = async (e) => {
        e.preventDefault()

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'participant/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    nightOut: uuid,
                    user: e.target.email.value,
                }),
            }
        )
        const thisData = await response.json()

        if (response.status === 201) {
            setSuccess('Participant successfully added to your Nightout.')
            setData(thisData)
            setTimeout(() => {
                setSuccess(false)
            }, 4800)
            refreshNightOut(uuid)
        } else if (response.status === 409) {
            setError(
                'It seems like the person you want to add, is allready participating in this Nightout.'
            )
            setTimeout(() => {
                setError(false)
            }, 4800)
            setData(thisData)
        } else {
            setError(
                'A user with that email does not exist. Or your friend did not create an account. Try again or ask your friend to create an account.'
            )
            setTimeout(() => {
                setError(false)
            }, 4800)
            setData(thisData)
        }
    }
    return {
        addParticipantToNightOut,
        error,
        success,
        data,
        setError,
        setSuccess,
    }
}

/** this custom hook fetches the backend to add an datesuggestion to a nightout */
const useAddDateSuggestionToNightOut = (token, uuid, refreshNightOut) => {
    const [dateError, setDateError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [dateSuggestionData, setDateSuggestionData] = useState(null)

    const addDateSuggestion = async (date) => {
        let response = await fetch(
            process.env.REACT_APP_API_URL + 'datesuggestion/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    nightOut: uuid,
                    date: date,
                }),
            }
        )
        let thisData = await response.json()

        if (response.status === 201) {
            setSuccess(
                'Your suggested date was successfully added to this Nightout'
            )
            setDateSuggestionData(thisData)
            refreshNightOut(uuid)
            setTimeout(() => {
                setSuccess(false)
            }, 4800)
        } else if (response.status === 400 || response.status === 409) {
            setDateSuggestionData(thisData)
            setDateError(thisData.message)
            setTimeout(() => {
                setDateError(false)
            }, 4800)
        } else {
            setDateError('Something went wrong')
            setTimeout(() => {
                setDateError(false)
            }, 4800)
        }
    }
    return {
        addDateSuggestion,
        dateError,
        setDateError,
        success,
        setSuccess,
        dateSuggestionData,
    }
}

/** this custom hook fetches the backend to add an  to a nightout */
const useAddParticipantDateToNightOut = (token, uuid, refreshNightOut) => {
    const [participantError, setParticipantError] = useState(null)
    const [working, setWorking] = useState(false)
    const [participantDateData, setParticipantDateData] = useState(null)

    const addParticipantDate = async (e) => {
        e.preventDefault()
        setWorking(true)

        if (e.target.checked) {
            let response = await fetch(
                process.env.REACT_APP_API_URL + 'participantdate/',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: `token ${token}`,
                    },
                    body: JSON.stringify({
                        pk: e.target.value,
                        commit: true,
                    }),
                }
            )
            let thisData = await response.json()

            if (response.status === 200) {
                setParticipantDateData(thisData)
                setTimeout(() => {
                    setWorking(false)
                    refreshNightOut(uuid)
                }, 4800)
            } else if (
                response.status === 400 ||
                response.status === 409 ||
                response.status === 404
            ) {
                setParticipantError(participantDateData.message)
                setTimeout(() => {
                    setWorking(false)
                }, 4800)
            } else {
                setParticipantError('Something went wrong')
                setTimeout(() => {
                    setWorking(false)
                }, 4800)
            }
        } else {
            let response = await fetch(
                process.env.REACT_APP_API_URL + 'participantdate/',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'Application/json',
                        Authorization: `token ${token}`,
                    },
                    body: JSON.stringify({
                        pk: e.target.value,
                        commit: false,
                    }),
                }
            )
            let thisData = await response.json()

            if (response.status === 200) {
                setParticipantDateData(thisData)
                setTimeout(() => {
                    setWorking(false)
                    refreshNightOut()
                }, 4800)
            } else if (
                response.status === 400 ||
                response.status === 409 ||
                response.status === 404
            ) {
                setParticipantError(participantDateData.message)
                setTimeout(() => {
                    setWorking(false)
                }, 4800)
            } else {
                setParticipantError('Something went wrong')
                setTimeout(() => {
                    setWorking(false)
                }, 4800)
            }
        }
    }
    return {
        addParticipantDate,
        participantError,
        working,
        participantDateData,
    }
}
export {
    useAddParticipantToNightOut,
    useAddDateSuggestionToNightOut,
    useAddParticipantDateToNightOut,
}
