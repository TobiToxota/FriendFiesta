const NumberOfSuggestionsComponent = ({ nightOut }) => {
    return (
        <div className="has-text-centered mt-2" style={{ transform: 'translateY(-3px)' }}>
            <p className="label is-size-5 is-size-6-mobile">
                {nightOut.planSuggestions.length} of {nightOut.participants.length} Participants
                have created are suggestion so far.
            </p>
            <p className="label is-size-5 is-size-6-mobile">
                
            </p>

            <p className="is-size-6">
                {nightOut.planSuggestions.length === 0 && (
                    <>
                        Nobody has submitted a suggestion...
                        <br />
                        Go and create one 🚀
                    </>
                )}
            </p>
        </div>
    )
}

export default NumberOfSuggestionsComponent
