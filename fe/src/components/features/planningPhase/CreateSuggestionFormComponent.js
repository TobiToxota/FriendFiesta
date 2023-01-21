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
                <h2 className="label is-size-3 has-text-centered">
                    Create your suggestion for {nightOut.title}
                </h2>
                <form>
                    <div className="has-text-centered">
                        <p className="is-inline-flex label is-size-5 mr-3" style={{verticalAlign: 'top'}}>
                            I want to add a description
                        </p>
                        <div
                            className="mt-check-garden is-inline-flex mt-1"
                            style={{ fontSize: '9px' }}
                        >
                            <input id={2} type="checkbox" />
                            <label htmlFor={2}></label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSuggestionFormComponent
