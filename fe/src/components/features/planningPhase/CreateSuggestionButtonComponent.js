// package imports
import React from 'react'

// local imports
import { useLoadSuggestion } from '../../../hooks/api/suggestionAPI'

const CreateSuggestionButtonComponent = ({
    nightOut,
    userData,
    token,
    setCreateSuggestion,
    createSuggestion,
}) => {
    // get the Suggestion from the current user
    const { suggestionLoading, suggestionData } = useLoadSuggestion(
        token,
        nightOut.uuid
    )

    return (
        <>
            {!suggestionData ? (
                <div className="has-text-centered mt-3">
                    {!suggestionLoading ? (
                        !createSuggestion ? (
                            <button
                                className="button is-primary is-rounded"
                                onClick={() => setCreateSuggestion(true)}
                            >
                                <span className="icon is-small">
                                    <i className="fa-regular fa-lightbulb"></i>
                                </span>
                                <span className="is-size-6">
                                    Add your suggestion
                                </span>
                            </button>
                        ) : (
                            <button
                                className="button is-danger is-rounded"
                                onClick={() => setCreateSuggestion(false)}
                            >
                                <span className="icon is-small">
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                                <span className="is-size-6">
                                    Close 
                                </span>
                            </button>
                        )
                    ) : (
                        <button className="button is-info is-primary is-loading">
                            Add your suggestion
                        </button>
                    )}
                </div>
            ) : null}
        </>
    )
}

export default CreateSuggestionButtonComponent
