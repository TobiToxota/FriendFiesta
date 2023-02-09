// package imports
import { useState } from 'react'

const useSuggestionCounter = ({ nightOut }) => {
    const [suggestionCounter, setSuggestionCounter] = useState(0)

    const incrementSuggestionCounter = () => {
        console.log(suggestionCounter)
        if (nightOut.planSuggestions.length === 0) {
            return
        }
        if (suggestionCounter < nightOut.planSuggestions.length - 1) {
            setSuggestionCounter((count) => count + 1)
            return
        }
        if (suggestionCounter === nightOut.planSuggestions.length - 1) {
            setSuggestionCounter(0)
        }
    }

    const decrementSuggestionCounter = () => {
        if (nightOut.planSuggestions.length === 0) {
            return
        }
        if (suggestionCounter > 0) {
            setSuggestionCounter(suggestionCounter - 1)
        }
        if (suggestionCounter === 0) {
            setSuggestionCounter(nightOut.planSuggestions.length - 1)
        }
    }

    return { suggestionCounter, incrementSuggestionCounter, decrementSuggestionCounter }
}

export { useSuggestionCounter }
