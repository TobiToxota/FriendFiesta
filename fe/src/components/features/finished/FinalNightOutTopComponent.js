const FinalNightOutTopComponent = ({ nightOut, suggestion, changeSuggestion }) => {
    return (
        <div
            className="container"
            id="main-container"
            style={{
                marginTop: '100px',
            }}
        >
            {nightOut.numberOfSuggestionsWithMaxVoteCount > 1 ? (
                <div className="has-text-centered">
                    <p className="subtitle is-4 is-size-5-touch has-text-white has-text-centered mb-3">
                        Unfortunately, there was no majority for a suggestion. There were{' '}
                        {nightOut.numberOfSuggestionsWithMaxVoteCount} suggestions that together
                        achieved the most votes with {suggestion.numberOfVotes} votes each.
                    </p>
                    <button
                        className="button is-light is-rounded"
                        onClick={() => changeSuggestion()}
                    >
                        Show me the other suggestions
                    </button>
                </div>
            ) : (
                <>
                    <p className="subtitle is-3 is-size-4-touch mb-2 has-text-white has-text-centered">
                        With {suggestion.numberOfVotes} votes, this suggestion has collected the
                        most votes.
                    </p>
                    <p className="subtitle is-4 is-size-5-touch has-text-white has-text-centered">
                        🚀 Look forward to "{nightOut.title}" with your loved ones, friends or
                        colleagues.
                    </p>
                </>
            )}
        </div>
    )
}

export default FinalNightOutTopComponent
