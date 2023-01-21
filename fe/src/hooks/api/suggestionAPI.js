import { useState, useEffect } from 'react'

const useLoadSuggestion = (token, uuid) => {
    const [suggestionData, setSuggestionData] = useState(null)
    const [suggestionSuccess, setSuggestionSuccess] = useState(null)
    const [suggestionError, setSuggestionError] = useState(null)
    const [suggestionLoading, setSuggestionLoading] = useState(false)

    const loadSuggestion = async () => {
        setSuggestionLoading(true)

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'suggestion/' + uuid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
            }
        )

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

const useAddSuggestion = (token, uuid, refreshNightOut) => {
    const [addSuggestionData, setAddSuggestioanData] = useState(null)
    const [addSuggestionError, setAddSuggestionError] = useState(null)
    const [addSuggestionFetching, SetAddSuggestionFetching] = useState(false)
    const [addSuggestionSuccess, setAddSuggestionSuccess] = useState(null)

    const addSuggestion = async (e) => {
        SetAddSuggestionFetching(true)

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'suggestion/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    description: e.target.description.value,
                    nightOut: uuid,
                }),
            }
        )
        let thisData = await response.json()

        if (response.status === 201) {
            setAddSuggestioanData(thisData)
            setAddSuggestionSuccess('Suggestion was successfully created')
            setTimeout(() => {
                setAddSuggestionSuccess(null)
                refreshNightOut()
            }, 4800)
        } else {
            setAddSuggestioanData(thisData)
            setAddSuggestionError('Something went wrong')
            setTimeout(() => {
                setAddSuggestionError(null)
                refreshNightOut()
            }, 4800)
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

export { useLoadSuggestion, useAddSuggestion }
