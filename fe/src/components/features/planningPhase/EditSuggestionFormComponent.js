// package imports
import React, { useState } from 'react'

// local imports
import ModalComponent from '../../common/ModalComponent'
import EditDescriptionModalComponent from './EditDescriptionModalComponent'
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
    // state for description
    const [description, setDescription] = useState(null)

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
                                <label className="label is-size-7-touch mb-0">
                                    Your current description:
                                </label>
                                <p className="mb-2 is-size-7-touch"> {suggestionData.description}</p>
                                <div className="field is-grouped is-justify-content-center">
                                    <p className="control">
                                        <button
                                            className="button is-link is-rounded is-size-7-touch"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Edit your description
                                        </button>
                                    </p>
                                    <p className="control">
                                        <button className="button is-danger is-rounded is-size-7-touch"
                                        onClick={() => putSuggestion({ description: null })}>
                                            <span className="icon">
                                                <i className="fa-regular fa-trash-can" />
                                            </span>
                                        </button>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ModalComponent
                showModal={showModal}
                setShowModal={setShowModal}
                fetching={putSuggestionFetching}
                click={() => putSuggestion({ description: description })}
                children={
                    <EditDescriptionModalComponent
                        suggestionData={suggestionData}
                        loadSuggestion={loadSuggestion}
                        token={token}
                        uuid={nightOut.uuid}
                        setDescription={setDescription}
                    />
                }
                title={<>Edit your description</>}
            ></ModalComponent>
        </>
    )
}

export default EditSuggestionFormComponent
