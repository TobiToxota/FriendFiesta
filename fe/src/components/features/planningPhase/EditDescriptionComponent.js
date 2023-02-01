// package imports
import { useState } from 'react'

// local imports
import { usePutSuggestion } from '../../../hooks/api/suggestionAPI'
import ModalComponent from '../../common/ModalComponent'
import EditDescriptionModalComponent from './EditDescriptionModalComponent'

const EditDescriptionComponent = ({loadSuggestion, token, nightOut, suggestionData}) => {
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
        <div className="field mt-2 has-text-centered">
            {suggestionData.description === null ? (
                <>
                    <label className="label is-size-6-touch">You did not add a description</label>
                    <button
                        className="button is-link is-rounded"
                        onClick={() => putSuggestion({ description: '' })}
                    >
                        Add a description
                    </button>
                </>
            ) : (
                <>
                    <label className="label is-size-7-touch mb-0">Your current description:</label>
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
                            <button
                                className="button is-danger is-rounded is-size-7-touch"
                                onClick={() => putSuggestion({ description: null })}
                            >
                                <span className="icon">
                                    <i className="fa-regular fa-trash-can" />
                                </span>
                            </button>
                        </p>
                    </div>
                </>
            )}
             
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

export default EditDescriptionComponent
