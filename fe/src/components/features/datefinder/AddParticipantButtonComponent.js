// package imports
import React, { useRef } from 'react'

// local imports
import { useAddParticipantToNightOut } from '../../../hooks/api/participantAPI'

const AddParticipantButtonComponent = ({
    nightOut,
    refreshNightOut,
    token,
}) => {
    const { addParticipantToNightOut } = useAddParticipantToNightOut(
        token,
        nightOut.uuid,
        refreshNightOut
    )

    const ref = useRef(null)

    const handleSubmit = () => {
        ref.current.value = ''
    }

    return (
        <div className="is-inline-flex">
            <form
                className="is-inline ml-1 fade-in"
                id="addParticipantForm"
                onSubmit={(e) => {
                    addParticipantToNightOut(e)
                    handleSubmit()
                }}
            >
                <div className="field has-addons">
                    <div className="control is-inline has-icons-left">
                        <input
                            className="input is-inline is-rounded is-size-7-touch is-small has-icons-left"
                            type="email"
                            placeholder="Enter email"
                            style={{ width: '161px' }}
                            name="email"
                            ref={ref}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-add mb-1" />
                        </span>
                    </div>
                    <div className="control is-inline">
                        <button
                            className="button is-link is-rounded is-small"
                            type="submit"
                        >
                            add participant
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddParticipantButtonComponent
