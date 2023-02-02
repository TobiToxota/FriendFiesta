// package imports
import React from 'react'

// local imports
import { useAddSuggestion } from '../../../hooks/api/suggestionAPI'

const CreateSuggestionButtonComponent = ({
    nightOut,
    token,
    loadSuggestion,
}) => {
    // get the useAddSuggestionHook
    const { addSuggestion, addSuggestionFetching } = useAddSuggestion(
        loadSuggestion,
        token,
        nightOut.uuid
    )

    return (
        <>
            <div className="has-text-centered mt-3">
                {!addSuggestionFetching ? (
                    <button
                        className="button is-primary is-rounded"
                        onClick={(e) => addSuggestion(e)}
                    >
                        <span className="icon is-small">
                            <i className="fa-regular fa-lightbulb"></i>
                        </span>
                        <span className="is-size-6 is-size-7-touch">Add your suggestion</span>
                    </button>
                ) : (
                    <button className="button is-primary is-rounded is-loading">
                        Add your suggestion
                    </button>
                )}
            </div>
        </>
    )
}

export default CreateSuggestionButtonComponent
