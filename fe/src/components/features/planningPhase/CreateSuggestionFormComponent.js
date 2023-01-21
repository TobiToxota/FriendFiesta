// package imports
import React from 'react'

// local imports
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'

const CreateSuggestionFormComponent = ({ token, nightOut }) => {
    useSwipeInFromBottom(
        CreateSuggestionFormComponent,
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
                    Create your suggestion for {nightOut.title}
                </h2>
                <p className="label has-text-centered is-size-6 is-size-7-touch">
                    Here you can create your suggestion. Afterwards you can add
                    entrys to your suggestion. An entry could be a specific
                    location like a bar or a bowling alley with the time you
                    approximately suggest to spent there. You can also add a
                    description to your suggestion if you want to share some
                    inside about it when the other participants take a look at
                    your suggestion in the next phase.
                </p>
                <div className="has-text-centered">
                    <button className="button is-primary is-rounded">
                        <span className="icon is-small">
                            <i className="fa-regular fa-lightbulb"></i>
                        </span>
                        <span className="is-size-6 is-size-7-touch">Yes, I want to add a suggestion</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateSuggestionFormComponent
