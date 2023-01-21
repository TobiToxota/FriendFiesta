// package imports
import React from 'react'

// local imports
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'
import { useAddSuggestion } from '../../../hooks/api/suggestionAPI'

const CreateSuggestionFormComponent = ({
    loadSuggestion,
    token,
    nightOut,
    setCreateSuggestion,
}) => {
    // animation
    useSwipeInFromBottom(
        CreateSuggestionFormComponent,
        '#create-suggestion-container'
    )

    // get the useAddSuggestionHook
    const {
        addSuggestion,
        addSuggestionSuccess,
        addSuggestionError,
        addSuggestionFetching,
    } = useAddSuggestion(loadSuggestion, token, nightOut.uuid)

    return (
        <div
            className="container is-fluid active is-rounded"
            id="create-suggestion-container"
        >
            <div
                className="notification is-light is-rounded shadow"
                style={{
                    marginTop: '0px !important',
                    borderRadius: 15,
                    minHeight: '150px',
                }}
            >
                <i
                    className="fa-solid fa-xmark fa-xl is-clickable"
                    id="x"
                    onClick={() => setCreateSuggestion(false)}
                />
                <h2 className="label is-size-5 is-size-6-touch has-text-centered mb-2">
                    Create your suggestion for {nightOut.title}
                </h2>
                <p className="label has-text-centered is-size-6 is-size-7-touch">
                    Are you sure that you want to create a suggestion for{' '}
                    {nightOut.title}?
                </p>
                <div className="has-text-centered">
                    <button
                        className="button is-primary is-rounded"
                        onClick={() => addSuggestion()}
                    >
                        <span className="icon is-small">
                            <i className="fa-regular fa-lightbulb"></i>
                        </span>
                        <span className="is-size-6 is-size-7-touch">
                            Yes, I want to add a suggestion
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateSuggestionFormComponent
