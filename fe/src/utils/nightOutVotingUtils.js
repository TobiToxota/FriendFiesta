/** This function takes  */
const incrementSuggestionCounter = (nightOut, loadCurrentSuggestion, setSuggestionCounter, suggestionCounter) => {
    if (nightOut.planSuggestions.length === 0) {
      return;
    }
    if (suggestionCounter < nightOut.planSuggestions.length - 1) {
      setSuggestionCounter(
        (count) => count + 1,
        function () {
          loadCurrentSuggestion();
        }
      );
      return;
    }
    if (suggestionCounter === nightOut.planSuggestions.length - 1) {
      setSuggestionCounter(0);
      loadCurrentSuggestion();
    }
  };

  const decrementSuggestionCounter = (nightOut, loadCurrentSuggestion, setSuggestionCounter, suggestionCounter) => {
    if (nightOut.planSuggestions.length === 0) {
      return;
    }
    if (suggestionCounter > 0) {
      setSuggestionCounter(suggestionCounter - 1);
      loadCurrentSuggestion();
    }
    if (suggestionCounter === 0) {
      setSuggestionCounter(nightOut.planSuggestions.length - 1);
      loadCurrentSuggestion();
    }
  };

  export {incrementSuggestionCounter, decrementSuggestionCounter};