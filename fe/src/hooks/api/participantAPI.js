/** @format */

// package imports
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

/** this custom hook fetches the backend to add an user to a nightout as a participant*/
const useAddParticipantToNightOut = (token, uuid, refreshNightOut) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [data, setData] = useState(null)

    const addParticipantToNightOut = async (e) => {
        e.preventDefault()

        let response = await fetch(process.env.REACT_APP_API_URL + 'participant/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightOut: uuid,
                user: e.target.email.value,
            }),
        })
        const thisData = await response.json()

        if (response.status === 201) {
            setData(thisData)
            toast.success('Participant successfully added to your Nightout.', {
                autoClose: 6500,
            })
            refreshNightOut(uuid)
        } else if (response.status === 409) {
            toast.error(
                'A user with that email does not exist. Or your friend did not create an account. Try again or ask your friend to create an account.',
                { autoClose: 6500 }
            )
            setData(thisData)
        } else {
            toast.error(
                'A user with that email does not exist. Or your friend did not create an account. Try again or ask your friend to create an account.',
                { autoClose: 6500 }
            )
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

/** this custom hook fetches the backend to delete a participant on a nightout */
const useDeleteParticipantFromNightOut = (token, uuid) => {
    const [deleteFetching, setDeleteFetching] = useState(false)

    const deleteParticipantFromNightOut = async () => {
        setDeleteFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'participantdelete/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightout: uuid,
            }),
        })

        if (response.status === 200) {
            toast.success('You successfully left this Nightout', {
                autoClose: 2000,
            })
            setTimeout(function () {
                setDeleteFetching(false)
                window.location.href = '/nightoutlist/'
            }, 2000)
        } else {
            setDeleteFetching(false)
            toast.error('Something went wrong', { autoClose: 3000 })
        }
    }

    return {
        deleteParticipantFromNightOut,
        deleteFetching,
    }
}

/** this custom hook fetches the backend to add an datesuggestion to a nightout */
const useAddDateSuggestionToNightOut = (token, uuid, refreshNightOut) => {
    const [dateError, setDateError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [dateSuggestionData, setDateSuggestionData] = useState(null)

    const addDateSuggestion = async (date) => {
        let response = await fetch(process.env.REACT_APP_API_URL + 'datesuggestion/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightOut: uuid,
                date: date,
            }),
        })
        let thisData = await response.json()

        if (response.status === 201) {
            toast.success('Your suggested date was successfully added', {
                autoClose: 2000,
            })
            setDateSuggestionData(thisData)
            refreshNightOut(uuid)
        } else if (response.status === 400 || response.status === 409) {
            setDateSuggestionData(thisData)
            toast.error('This date is allready a date in this Nightout')
        } else {
            toast.error('Something went wrong')
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

/** this custom hook fetches the backend to add an participantDate to a nightout */
const useAddParticipantDateToNightOut = (token, uuid, refreshNightOut) => {
    const [participantError, setParticipantError] = useState(null)
    const [working, setWorking] = useState(false)
    const [participantDateData, setParticipantDateData] = useState(null)

    const addParticipantDateToNightOut = async (e) => {
        e.preventDefault()
        setWorking(true)

        if (e.target.checked) {
            let response = await fetch(process.env.REACT_APP_API_URL + 'participantdate/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    pk: e.target.value,
                    commit: true,
                }),
            })
            let thisData = await response.json()

            if (response.status === 200) {
                setParticipantDateData(thisData)
                setTimeout(() => {
                    setWorking(false)
                    refreshNightOut(uuid)
                }, 1000)
            } else if (
                response.status === 400 ||
                response.status === 409 ||
                response.status === 404
            ) {
                setParticipantError(participantDateData.message)
                setTimeout(() => {
                    setWorking(false)
                }, 1000)
            } else {
                setParticipantError('Something went wrong')
                setTimeout(() => {
                    setWorking(false)
                }, 1000)
            }
        } else {
            let response = await fetch(process.env.REACT_APP_API_URL + 'participantdate/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    pk: e.target.value,
                    commit: false,
                }),
            })
            let thisData = await response.json()

            if (response.status === 200) {
                setParticipantDateData(thisData)
                setTimeout(() => {
                    setWorking(false)
                    refreshNightOut(uuid)
                }, 1000)
            } else if (
                response.status === 400 ||
                response.status === 409 ||
                response.status === 404
            ) {
                setParticipantError(participantDateData.message)
                setTimeout(() => {
                    setWorking(false)
                    refreshNightOut(uuid)
                }, 1000)
            } else {
                setParticipantError('Something went wrong')
                setTimeout(() => {
                    setWorking(false)
                    refreshNightOut(uuid)
                }, 1000)
            }
        }
    }
    return {
        addParticipantDateToNightOut,
        participantError,
        working,
        participantDateData,
    }
}

/** this custom hook fetches the backend to switch the finishedDatePhaseState of a participant */
const usePutParticipantStateDate = (token, nightOut, refreshNightOut, refreshParticipantInfos) => {
    const [loading, setLoading] = useState(false)

    const putParticipantState = async () => {
        setLoading(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'participantcommitdate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightout_uuid: nightOut.uuid,
            }),
        })

        if (response.status === 201) {
            toast.success('Successfully changed!', {
                autoClose: 2000,
            })
            setLoading(false)
            refreshNightOut(nightOut.uuid)
            refreshParticipantInfos(nightOut.uuid)
        } else if (response.status === 400 || response.status === 409) {
            toast.error('Something went wrong')
        } else {
            toast.error('Something went wrong')
        }
    }
    return {
        putParticipantState,
        loading,
    }
}

/** this custom hook fetches the backend to switch the finishedDatePhaseState of a participant */
const usePutParticipantStatePlanning = (token, nightOut, refreshNightOut) => {
    const [loading, setLoading] = useState(false)

    const putParticipantState = async () => {
        setLoading(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'participantcommitplanning', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightout_uuid: nightOut.uuid,
            }),
        })

        if (response.status === 201) {
            toast.success('Successfully changed!', {
                autoClose: 2000,
            })
            setLoading(false)
            refreshNightOut(nightOut.uuid)
        } else if (response.status === 400 || response.status === 409) {
            toast.error('Something went wrong')
        } else {
            toast.error('Something went wrong')
        }
    }
    return {
        putParticipantState,
        loading,
    }
}

/** this custom hook gets the participant infos about a user */
const useGetParticipantInfos = (token, nightOut) => {
    const [participantInfos, setParticipantInfos] = useState(null)
    const [participantLoading, setParticipantLoading] = useState(true)

    const getParticipantInfos = async (uuid) => {
        let response = await fetch(process.env.REACT_APP_API_URL + 'participant/' + uuid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
        })
        let thisData = await response.json()

        if (response.status === 200) {
            setParticipantInfos(thisData)
            setParticipantLoading(false)
        } else {
            setParticipantLoading(false)
        }
    }
    useEffect(() => {
        getParticipantInfos(nightOut.uuid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, nightOut])

    return { getParticipantInfos, participantInfos, participantLoading }
}

export {
    useAddParticipantToNightOut,
    useAddDateSuggestionToNightOut,
    useAddParticipantDateToNightOut,
    useDeleteParticipantFromNightOut,
    usePutParticipantStateDate,
    useGetParticipantInfos,
    usePutParticipantStatePlanning,
}
