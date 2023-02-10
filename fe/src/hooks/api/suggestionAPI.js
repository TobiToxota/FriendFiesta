// package imports
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

/** this custom hook fetches the backend to load a suggestion*/
const useLoadSuggestion = (token, uuid) => {
    const [suggestionData, setSuggestionData] = useState(null)
    const [suggestionSuccess, setSuggestionSuccess] = useState(null)
    const [suggestionError, setSuggestionError] = useState(null)
    const [suggestionLoading, setSuggestionLoading] = useState(false)

    const loadSuggestion = async () => {
        setSuggestionLoading(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/' + uuid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
        })

        let thisData = await response.json()

        if (response.status === 200) {
            setSuggestionData(thisData)
            setSuggestionSuccess('Suggestion successfully loading')
            setSuggestionLoading(false)
            return
        } else {
            setSuggestionError('Something went wrong')
            setSuggestionData(null)
            setSuggestionLoading(false)
        }
    }
    useEffect(() => {
        loadSuggestion()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, uuid])

    return {
        loadSuggestion,
        suggestionData,
        suggestionSuccess,
        suggestionError,
        suggestionLoading,
    }
}

/** this custom hook fetches the backend to add a suggestion*/
const useAddSuggestion = (refreshSuggestion, token, uuid, refreshNightOut) => {
    const [addSuggestionData, setAddSuggestioanData] = useState(null)
    const [addSuggestionError, setAddSuggestionError] = useState(null)
    const [addSuggestionFetching, SetAddSuggestionFetching] = useState(false)
    const [addSuggestionSuccess, setAddSuggestionSuccess] = useState(null)

    const addSuggestion = async (e) => {
        e.preventDefault()
        SetAddSuggestionFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightOut: uuid,
            }),
        })
        let thisData = await response.json()

        if (response.status === 201) {
            setAddSuggestioanData(thisData)
            toast.success('Suggestion was successfully created.', {
                autoClose: 2000,
            })
            setTimeout(() => {
                setAddSuggestionSuccess(null)
                refreshSuggestion(uuid)
                refreshNightOut(uuid)
            }, 1500)
        } else {
            setAddSuggestioanData(thisData)
            toast.error('Somethinh went wrong', {
                autoClose: 2000,
            })
            setTimeout(() => {
                setAddSuggestionError(null)
                refreshSuggestion(uuid)
            }, 1500)
        }
    }
    return {
        addSuggestion,
        addSuggestionData,
        addSuggestionFetching,
        addSuggestionSuccess,
        addSuggestionError,
        setAddSuggestionError,
        setAddSuggestionSuccess,
    }
}

/** this custom hook fetches the backend to add props in a put request to a suggestion*/
const usePutSuggestion = (loadSuggestion, token, uuid, suggestion) => {
    const [putSuggestionetching, setPutSuggestionFetching] = useState(false)

    const putSuggestion = async (props) => {
        setPutSuggestionFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                id: suggestion.id,
                nightOut: uuid,
                ...props,
            }),
        })

        if (response.status === 201) {
            if (props.description === null) {
                toast.success('Your description was successfully deleted 🗑️')
                loadSuggestion(uuid)
                return
            }
            toast.success('Your description was successfully modified')
            setTimeout(() => {
                setPutSuggestionFetching(false)
            }, 1500)
            loadSuggestion(uuid)
        } else {
            toast.error('Something went wrong')
        }
    }

    return {
        putSuggestion,
        putSuggestionetching,
    }
}

/** this custom hook fetches the backend to delete a suggestion */
const useDeleteSuggestion = (loadSuggestion, token, suggestion, refreshNightOut, uuid) => {
    const [deleteSuggestionFeteching, setDeleteSuggestionFetching] = useState(false)

    const deleteSuggestion = async () => {
        setDeleteSuggestionFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                planSuggestion: suggestion.id,
            }),
        })
        if (response.status === 204) {
            toast.success('Your Suggestion was successfully deleted 🗑️')
            setDeleteSuggestionFetching(false)
            loadSuggestion()
            refreshNightOut(uuid)
        } else {
            toast.error('Something went wrong')
        }
    }

    return { deleteSuggestion, deleteSuggestionFeteching }
}

/** this custom hook fetches the backend to add an entry to a suggestion */
const useAddEntryToSuggestion = (loadSuggestion, token, uuid, suggestion) => {
    const [addEntryFetching, setAddEntryFetching] = useState(false)

    const addEntry = async (e) => {
        e.preventDefault()
        setAddEntryFetching(true)

        if (
            e.target.startTime.value === '' ||
            e.target.endTime.value === '' ||
            e.target.location.value === ''
        ) {
            toast.error('You need to fill out the form first.')
            setTimeout(() => {
                setAddEntryFetching(false)
            }, 300)
            return
        }


        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/entrys/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                planSuggestion: suggestion.id,
                nightOut: uuid,
                startTime: e.target.startTime.value,
                endTime: e.target.endTime.value,
                name: e.target.location.value,
                formType: e.target.formType.value,
            }),
        })
        if (response.status === 201) {
            toast.success('Your entry was successfully added')
            setTimeout(() => {
                setAddEntryFetching(false)
            }, 300)
            loadSuggestion()
            return
        } else {
            toast.error('Something went wrong')
            return
        }
    }

    return {
        addEntry,
        addEntryFetching,
    }
}

/** this custom hook fetches the backend to delete an entry from a suggestion */
const useDeleteEntryFromSuggestion = (loadSuggestion, token) => {
    const deleteEntryFromSuggestion = async (id) => {
        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/entrys/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                id: id,
            }),
        })
        if (response.status === 204) {
            toast.success('Your selected entry was successfully deleted 🗑️')
            setTimeout(() => {
                loadSuggestion()
            }, 300)
            return
        } else {
            toast.error('Something went wrong')
            return
        }
    }
    return {
        deleteEntryFromSuggestion,
    }
}

/** This custom hook fetches the backend to make a put request and change an entry on a suggestion */
const usePutEntryFromSuggestion = (loadSuggestion, token, entry) => {
    const [putEntryFetching, setPutEntryFetching] = useState(false)

    const putEntryFromSuggestion = async (e) => {
        e.preventDefault()
        setPutEntryFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/entrys/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                id: entry.id,
                startTime: e.target.startTime.value,
                endTime: e.target.endTime.value,
                location: e.target.location.value,
                name: e.target.name.value,
                locationType: e.target.locationType.value,
                planSuggestion: entry.planSuggestion,
                formType: entry.formType
            }),
        })

        if (response.status === 201) {
            toast.success('Your entry was successfully modified')
            setTimeout(() => {
                setPutEntryFetching(false)
            }, 300)
            loadSuggestion()
            return
        } else {
            toast.error('Something went wrong')
            return
        }
    }
    return {
        putEntry: putEntryFromSuggestion,
        putEntryFetching,
    }
}

export {
    useLoadSuggestion,
    useAddSuggestion,
    usePutSuggestion,
    useDeleteSuggestion,
    useAddEntryToSuggestion,
    useDeleteEntryFromSuggestion,
    usePutEntryFromSuggestion
}
