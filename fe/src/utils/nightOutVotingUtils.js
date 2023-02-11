/** This function takes an id of an selected suggestion and returns it from the nightout Json */
const getSuggestionFromNightOut = (nightout, id) => {
  return nightout.planSuggestions.find(suggestion => suggestion.id === id);
}

export { getSuggestionFromNightOut };