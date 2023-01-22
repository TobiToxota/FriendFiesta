// package imports
import React from 'react'

// local imports
import {
    useSwipeInFromBottom,
} from '../../../hooks/animations/animations'

const EditSuggestionFormComponent = ({
    loadSuggestion,
    token,
    nightOut,
}) => {

    // animation
    useSwipeInFromBottom(
        EditSuggestionFormComponent,
        '#create-suggestion-container'
    )

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
                <h2 className="label is-size-5 is-size-6-touch has-text-centered mb-2">
                    Edit your Suggestion for {nightOut.title}
                </h2>
            </div>
        </div>
    )
}

export default EditSuggestionFormComponent
