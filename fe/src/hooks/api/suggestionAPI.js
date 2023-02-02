import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

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

const useAddSuggestion = (refreshSuggestion, token, uuid) => {
    const [addSuggestionData, setAddSuggestioanData] = useState(null)
    const [addSuggestionError, setAddSuggestionError] = useState(null)
    const [addSuggestionFetching, SetAddSuggestionFetching] = useState(false)
    const [addSuggestionSuccess, setAddSuggestionSuccess] = useState(null)

    const addSuggestion = async (e) => {
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
                toast.success('Your Suggestion was successfully deleted 🗑️')
                loadSuggestion(uuid)
                return
            }
            toast.success('Your Suggestion was successfully modified')
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

const useAddEntryToSuggestion = (loadSuggestion, token, uuid, suggestion) => {
    const [addEntryFetching, setAddEntryFetching] = useState(false)

    const addEntry = async (e) => {
        setAddEntryFetching(true)

        if (
            e.target.startTime.value === "" ||
            e.target.endTime.value === "" ||
            e.target.location.value === ""
          ) {
            toast.error('You need to put in some stuff ')
            return;
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
        });
        if (response.status === 201) {
            toast.success('Your Entry was successfully modified')
            setAddEntryFetching(false)
        }
    } 
}

export { useLoadSuggestion, useAddSuggestion, usePutSuggestion }
