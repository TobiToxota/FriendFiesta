// package imports
import { useState } from 'react'
import { toast } from 'react-toastify'

const useCreateNewVote = ( token, refreshNightOut, getParticipantInfos, uuid ) => {
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

export { useCreateNewVote }
