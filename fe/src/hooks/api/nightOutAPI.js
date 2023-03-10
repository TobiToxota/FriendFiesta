/** @format */

// package imports
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

/* this custom hook fetches the backend and creates a nightOut Object in the database */
const useCreateNightOut = (token) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')

    async function createNightOut(e) {
        e.preventDefault()

        // Error Handling
        if (e.target.title.value.length < 2) {
            toast.error('Please enter a title, or at least 2 characters', {
                autoClose: 6500,
            })
            return { data, error }
        }

        // Error Handling
        if (e.target.title.value.length > 39) {
            toast.error('Ensure that your title has not more than 40 characters', {
                autoClose: 6500,
            })
            return { data, error }
        }

        let response = await fetch(process.env.REACT_APP_API_URL + 'nightoutlist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                title: e.target.title.value,
            }),
        })
        let thisData = await response.json()

        // check the response
        if (response.status === 201) {
            toast.info('🚀 Your nightout is beeing created. You will get redirected ')
            setData(thisData)
            // send user to the new nightout
            setTimeout(function () {
                window.location.href = '/nightout/' + thisData.uuid
            }, 4800)
        } else {
            toast.error('Something went wrong')
            setData(thisData)
        }
    }
    return { data, error, setError, createNightOut }
}

/* this custom hook fetches the bakend for the data of the nighOut */
const useGetNightOut = (token, uuid) => {
    const [nightOut, setNightOut] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    async function refreshNightOut(uuid) {
        let response = await fetch(process.env.REACT_APP_API_URL + 'nightout/' + uuid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
        })
        let thisData = await response.json()

        if (response.status === 200) {
            setNightOut(thisData)
            setSuccess('Nightout loaded')
            setLoading(false)
        } else {
            toast.error('You are not participating in this Nightout')
            setNightOut(thisData)
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshNightOut(uuid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid, token])

    return { refreshNightOut, nightOut, error, setError, success, loading }
}

/** This custom hook fetches the backend for all nightouts that a user is participating in */
const useGetNightOutList = (token) => {
    const [nightOutList, setNightOutList] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(true)

    const getNightOutList = async () => {
        let response = await fetch(process.env.REACT_APP_API_URL + 'nightoutlist/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
        })
        let thisData = await response.json()

        if (response.status === 200) {
            setNightOutList(thisData)
            setSuccess('Nightoutlist loaded')
            setLoading(false)
        } else {
            setError('Something went wrong')
            setNightOutList(thisData)
            setLoading(false)
        }
    }
    useEffect(() => {
        getNightOutList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return { getNightOutList, nightOutList, error, success, loading }
}

/** This custom hook fetches the backend to bring the nightout to the next phase */
const usePutNextStage = (token, nightOut, refreshNightOut) => {
    const [putNextStageFetching, setPutNextStageFetching] = useState(false)

    const putNextStage = async (nextStage) => {
        setPutNextStageFetching(true)

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'nightout/' + nightOut.uuid + '/',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    phase: nextStage,
                    nightOut: nightOut.uuid,
                    finalDate: nightOut.finalDate,
                    title: nightOut.title,
                    joinLinkCreated: nightOut.joinLinkCreated,
                }),
            }
        )

        if (response.status === 200) {
            toast.success(
                'This Nightout was successfully put in the next Phase. Nightout refreshing'
            )
            setPutNextStageFetching(false)
            refreshNightOut(nightOut.uuid)
        } else {
            toast.error('Something went wrong')
            setPutNextStageFetching(false)
            refreshNightOut(nightOut.uuid)
        }
    }

    return {
        putNextStage,
        putNextStageFetching,
    }
}


/** This custom hook fetches the backend to bring the nightout to create a join link */
const useCreateJoinLink = (token, nightOut, refreshNightOut) => {
    const [createJoinLinkFetching, setCreateJoinLinkFetching] = useState(false)

    const createJoinLink = async (password) => {
        setCreateJoinLinkFetching(true)

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'nightout/' + nightOut.uuid + '/',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    nightOut: nightOut.uuid,
                    title: nightOut.title,
                    joinLinkCreated: true,
                    joinLinkPassword: password,
                    finalDate: null,
                }),
            }
        )

        if (response.status === 200) {
            toast.success(
                'The join link was successfully created.'
            )
            setCreateJoinLinkFetching(false)
            refreshNightOut(nightOut.uuid)
        }  else if (response.status === 404) {
            toast.error('Join Link allready created')
        }
        else {
            toast.error('Something went wrong')
            setCreateJoinLinkFetching(false)
            refreshNightOut(nightOut.uuid)
        }
    }

    return {
        createJoinLink,
        createJoinLinkFetching
    }
}

/** This custom hook fetches the backend to set a finaldate to a nightout and bring it to the next phase */
const useAddFinalDate = (token, nightout, refreshNightOut, setAddFinalDateLoading) => {
    const [finalDateError, setFinalDateError] = useState(null)
    const [finalDateSuccess, setFinalDateSuccess] = useState(null)
    const [finalDateFetching, setFinalDateFetching] = useState(false)

    const addFinalDate = async (e) => {
        e.preventDefault()
        setFinalDateFetching(true)
        setAddFinalDateLoading(true)

        // Error handling
        if (e.target.dateselecter.value === null || e.target.dateselecter.value === '') {
            toast.error(
                'You have to select a date or at least have one date suggested in this Nightout.',
                { autoClose: 3000 }
            )
            setTimeout(() => {
                setFinalDateFetching(false)
                setFinalDateError(null)
                setAddFinalDateLoading(false)
            }, 3000)
            return
        }

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'nightout/' + nightout.uuid + '/',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    title: nightout.title,
                    nightOut: nightout.uuid,
                    finalDate: e.target.dateselecter.value,
                    phase: 'planningPhase',
                    joinLinkCreated: nightout.joinLinkCreated
                }),
            }
        )

        if (response.status === 200) {
            setFinalDateSuccess(
                'This Nightout was successfully put in the next Phase. Nightout refreshing'
            )
            toast.success(
                'This Nightout was successfully put in the next Phase. Nightout refreshing',
                { autoClose: 3000 }
            )
            setTimeout(() => {
                setFinalDateFetching(false)
                setFinalDateSuccess(null)
                setAddFinalDateLoading(false)
                refreshNightOut(nightout.uuid)
            }, 3000)
        } else {
            toast.error(
                'You have to select a date or at least have one date suggested in this Nightout.',
                { autoClose: 3000 }
            )
            setTimeout(() => {
                setFinalDateFetching(false)
                setFinalDateError(null)
                setAddFinalDateLoading(false)
                refreshNightOut(nightout.uuid)
            }, 3000)
        }
    }

    return {
        addFinalDate,
        finalDateError,
        finalDateFetching,
        finalDateSuccess,
        setFinalDateSuccess,
        setFinalDateError,
    }
}

export { useCreateNightOut, useGetNightOut, useGetNightOutList, usePutNextStage, useAddFinalDate, useCreateJoinLink }
