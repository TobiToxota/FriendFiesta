// package imports
import { useState } from'react'

// local imports
import { swipeAwayAndComeBack } from '../animations/animations'

const useFinalSuggestionsCounter = (nightOut) => {
    const [suggestionCounter, setSuggestionCounter] = useState(0)

    const switchCounter = () => {
        swipeAwayAndComeBack('#finished-night-out')
        if (suggestionCounter === 0) {
            setSuggestionCounter(1)
        } else if (suggestionCounter === nightOut.numberOfSuggestionsWithMaxVoteCount) {
            setSuggestionCounter(0)
        } else {
            setSuggestionCounter(suggestionCounter + 1)
        }
    }

    return { suggestionCounter, switchCounter }
}

export { useFinalSuggestionsCounter }
