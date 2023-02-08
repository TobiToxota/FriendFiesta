// package imports
import React from 'react'

// local imports
import { useAddSuggestion } from '../../../hooks/api/suggestionAPI'

const CreateSuggestionButtonComponent = ({ nightOut, token, loadSuggestion, refreshNightOut }) => {
    // get the useAddSuggestionHook
    const { addSuggestion, addSuggestionFetching } = useAddSuggestion(
        loadSuggestion,
        token,
        nightOut.uuid,
        refreshNightOut,
    )

    return (
        <>
        <p className="mt-1 label has-text-centered is-size-5 mb-1 is-size-6-touch">
            You did not create a suggestion - if you want to create one 🚀!
        </p>
            <div className="has-text-centered">
                {!addSuggestionFetching ? (
                    <button
                        className="button is-primary is-rounded is-size-7-touch"
                        onClick={(e) => addSuggestion(e)}
                    >
                        <span className="icon is-small">
                            <i className="fa-regular fa-lightbulb"></i>
                        </span>
                        <span className="">Add your suggestion</span>
                    </button>
                ) : (
                    <button className="button is-primary is-rounded is-loading is-size-7-touch">
                        Add your suggestion
                    </button>
                )}
            </div>
        </>
    )
}

export default CreateSuggestionButtonComponent
