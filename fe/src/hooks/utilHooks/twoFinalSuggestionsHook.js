// package imports
import { useState } from'react'

// local imports
import { swipeAwayAndComeBack } from '../animations/animations'

const useTwoFinalSuggestions = (nightOut) => {
    const [suggestionCounter, setSuggestionCounter] = useState(0)

    const switchCounter = () => {
        swipeAwayAndComeBack('#finished-night-out')
        if (suggestionCounter === 0) {
            setSuggestionCounter(1)
        } else {
            setSuggestionCounter(0)
        }
    }

    return { suggestionCounter, switchCounter }
}

export { useTwoFinalSuggestions }
