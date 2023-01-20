// package imports
import React from 'react'

// local imports
import { useLoadSuggestion } from '../../../hooks/api/suggestionAPI'

const CreateSuggestionButtonComponent = ({ nightOut, userData, token }) => {
    // get the Suggestion from the current user
    const {
        loadSuggestion,
        suggestionSuccess,
        suggestionError,
        suggestionLoading,
        suggestionData,
    } = useLoadSuggestion(token, nightOut.uuid)

    return (
        <>
            {!suggestionData ? (
                <div className="has-text-centered mt-3">
                    {!suggestionLoading ? (
                        <button className="button is-primary is-rounded">
                            <span className="icon is-small">
                                <i className="fa-regular fa-lightbulb"></i>
                            </span>
                            <span className="is-size-6">
                                Add your suggestion
                            </span>
                        </button>
                    ) : (
                        <button className="button is-info is-primary is-loading" />
                    )}
                </div>
            ) : null}
        </>
    )
}

export default CreateSuggestionButtonComponent
