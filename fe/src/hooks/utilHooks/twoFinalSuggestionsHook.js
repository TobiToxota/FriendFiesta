// package imports
import { useState } from'react'

const useTwoFinalSuggestions = (nightOut) => {
    const [suggestionCounter, setSuggestionCounter] = useState(0)

    const switchCounter = () => {
        if (suggestionCounter === 0) {
            setSuggestionCounter(1)
        } else {
            setSuggestionCounter(0)
        }
    }

    return { suggestionCounter, switchCounter }
}

export { useTwoFinalSuggestions }
