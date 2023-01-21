// package imports
import React from 'react'

// local imports

const CreateSuggestionButtonComponent = ({
    nightOut,
    token,
    setCreateSuggestion,
    createSuggestion,
    suggestionLoading,
}) => {



    return (
        <>
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
                            <span className="is-size-6 is-size-7-touch">
                                Add your suggestion
                            </span>
                        </button>
                    ) : (
                        <button
                            className="button is-primary is-rounded "
                        disabled>
                            <span className="icon is-small">
                                <i className="fa-regular fa-lightbulb"></i>
                            </span>
                            <span className="is-size-6 is-size-7-touch">
                                Add your suggestion
                            </span>
                        </button>
                    )
                ) : (
                    <button className="button is-info is-primary is-loading">
                        Add your suggestion
                    </button>
                )}
            </div>
        </>
    )
}

export default CreateSuggestionButtonComponent
