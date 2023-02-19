// package imports
import React, { useRef } from 'react'

// local imports
import { useAddParticipantToNightOut } from '../../../hooks/api/participantAPI'

const AddParticipantButtonComponent = ({ nightOut, refreshNightOut, token }) => {
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
                <div className="field has-addons is-hidden-mobile">
                    <div className="control is-inline has-icons-left">
                        <input
                            className="input is-inline is-rounded is-size-7-touch is-small has-icons-left"
                            type="email"
                            placeholder="Enter email"
                            style={{ minWidth: '100px' }}
                            name="email"
                            ref={ref}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-add mb-1" />
                        </span>
                    </div>
                    <div className="control is-inline">
                        <button className="button is-link is-rounded is-small" type="submit">
                            <span className="icon is-small">
                                <i className="fa-solid fa-user-plus"></i>
                            </span>
                            <span>add participant</span>
                        </button>
                    </div>
                    <div className="control is-inline">
                        <button className="button is-success is-rounded is-small" type="submit">
                            <span className="icon is-small">
                                <i className="fa-solid fa-link"></i>
                            </span>
                            <span>create a join link</span>
                        </button>
                    </div>
                </div>
                <div className="is-hidden-tablet">
                    <div className="field has-addons mb-2">
                        <div className="control is-inline has-icons-left">
                            <input
                                className="input is-inline is-rounded is-size-7-touch is-small has-icons-left"
                                type="email"
                                placeholder="Enter email"
                                style={{ minWidth: '100px' }}
                                name="email"
                                ref={ref}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-add mb-1" />
                            </span>
                        </div>
                        <div className="control is-inline">
                            <button className="button is-link is-rounded is-small" type="submit">
                                <span className="icon is-small">
                                    <i className="fa-solid fa-user-plus"></i>
                                </span>
                                <span>add participant</span>
                            </button>
                        </div>
                    </div>
                    <button className="button is-success is-rounded is-small">
                        <span className="icon is-small">
                            <i className="fa-solid fa-link"></i>
                        </span>
                        <span>create a join link</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddParticipantButtonComponent
