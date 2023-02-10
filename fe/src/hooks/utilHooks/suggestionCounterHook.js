// package imports
import { useState } from 'react'

const useSuggestionCounter = (nightOut) => {
    const [suggestionCounter, setSuggestionCounter] = useState(1)

    const incrementSuggestionCounter = () => {
        if (nightOut.planSuggestions.length === 0) {
            return
        }
        if (suggestionCounter < nightOut.planSuggestions.length) {
            setSuggestionCounter((count) => count + 1)
            return
        }
        if (suggestionCounter === nightOut.planSuggestions.length) {
            setSuggestionCounter(1)
        }
    }

    const decrementSuggestionCounter = () => {
        if (nightOut.planSuggestions.length === 0) {
            return
        }
        if (suggestionCounter > 1) {
            setSuggestionCounter(suggestionCounter - 1)
        }
        if (suggestionCounter === 1) {
            setSuggestionCounter(nightOut.planSuggestions.length)
        }
    }

    return { suggestionCounter, incrementSuggestionCounter, decrementSuggestionCounter }
}

export { useSuggestionCounter }
