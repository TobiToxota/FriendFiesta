// package imports
import React, { useState } from 'react'

// local imports
import ModalComponent from '../../common/ModalComponent'
import EditDescriptionComponent from './EditDescriptionComponent'
import { usePutSuggestion } from '../../../hooks/api/suggestionAPI'
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'

const EditSuggestionFormComponent = ({ loadSuggestion, token, nightOut, suggestionData }) => {
    // animation
    useSwipeInFromBottom(EditSuggestionFormComponent, '#create-suggestion-container')

    // putSuggestionHook
    const { putSuggestion, putSuggestionFetching } = usePutSuggestion(
        loadSuggestion,
        token,
        nightOut.uuid,
        suggestionData
    )

    // state for Modal
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="container is-fluid active is-rounded" id="create-suggestion-container">
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
                    <div className="field mt-2 has-text-centered">
                        {suggestionData.description === null ? (
                            <>
                                <label className="label is-size-6-touch">
                                    You did not add a description
                                </label>
                                <button
                                    className="button is-link is-rounded"
                                    onClick={() => putSuggestion({ description: '' })}
                                >
                                    Add a description
                                </button>
                            </>
                        ) : (
                            <>
                                <label className="label is-size-6-touch mb-0">
                                    Your current description:
                                </label>
                                <p className="mb-2"> {suggestionData.description}</p>
                                <button
                                    className="button is-link is-rounded"
                                    onClick={() => setShowModal(true)}
                                >
                                    Edit your description
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ModalComponent
                showModal={showModal}
                setShowModal={setShowModal}
                children={<EditDescriptionComponent suggestionData={suggestionData} />}
                title={<>Edit your description</>}
            ></ModalComponent>
        </>
    )
}

export default EditSuggestionFormComponent
