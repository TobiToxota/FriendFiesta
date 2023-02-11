// package imports
import { useState } from 'react'
import { toast } from 'react-toastify'

/** This custom hook creates a new vote in the backend */
const useCreateNewVote = (token, refreshNightOut, getParticipantInfos, uuid) => {
    const [newVoteFetching, setNewVoteFetching] = useState(false)

    const createNewVote = async (suggestionId) => {
        setNewVoteFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'suggestion/suggestionVote/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                planSuggestion: suggestionId,
            }),
        })
        if (response.status === 201) {
            toast.success('🗳️ You Voted!')
            refreshNightOut(uuid)
            getParticipantInfos(uuid)
            setNewVoteFetching(false)
        } else if (response.status === 400) {
            toast.error('You allready voted for the exact same planSuggestion')
        } else {
            toast.error('Something went wrong')
        }
    }

    return { createNewVote, newVoteFetching }
}

/** This custom hook declares that a user declares abstention */
const useDeclareAbstention = (token, nightOut, refreshNightOut, getParticipantInfos) => {
    const [declareAbstentionFetching, setDeclareAbstentionFetching] = useState(false)

    const declareAbstention = async () => {
        setDeclareAbstentionFetching(true)

        let response = await fetch(
            process.env.REACT_APP_API_URL + 'suggestion/suggestionVote/abstention/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    nightOut: nightOut.uuid,
                }),
            }
        )
        if (response.status === 201) {
            toast.success('You declared your abstention.')
            refreshNightOut(nightOut.uuid)
            getParticipantInfos(nightOut.uuid)
            setDeclareAbstentionFetching(false)
        } else if (response.status === 400) {
            toast.error('You already declared your abstention.')
            setDeclareAbstentionFetching(false)
        } else {
            toast.error('Something went wrong.')
            setDeclareAbstentionFetching(false)
        }
    }

    return { declareAbstention, declareAbstentionFetching }
}

export { useCreateNewVote, useDeclareAbstention }
