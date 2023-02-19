// package imports
import React, { useRef, useState } from 'react'

// local imports
import { useAddParticipantToNightOut } from '../../../hooks/api/participantAPI'
import { useCreateJoinLink } from '../../../hooks/api/nightOutAPI'
import ModalCardComponent from '../../common/ModalCardComponent'
import JoinLinkModalComponent from './JoinLinkModalComponent'

const AddParticipantButtonComponent = ({ nightOut, refreshNightOut, token }) => {
    // get the addParticipantHook
    const { addParticipantToNightOut } = useAddParticipantToNightOut(
        token,
        nightOut.uuid,
        refreshNightOut
    )
    // get the createJoinLinkHook
    const { createJoinLink, createJoinLinkFetching } = useCreateJoinLink(
        token,
        nightOut,
        refreshNightOut
    )

    // state for Modal
    const [showModal, setShowModal] = useState(false)
    // state for join link password
    const [joinLinkPassword, setJoinLinkPassword] = useState('')

    // use useRef to clear the participant input
    const ref = useRef(null)

    const handleSubmit = () => {
        ref.current.value = ''
    }

    return (
        <>
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
                            <button
                                className="button is-success is-rounded is-small"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                <span className="icon is-small">
                                    <i className="fa-solid fa-link"></i>
                                </span>
                                {nightOut.joinLinkCreated ? (
                                    <span>show the join link</span>
                                ) : (
                                    <span>create a join link</span>
                                )}
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
                                <button
                                    className="button is-link is-rounded is-small"
                                    type="submit"
                                >
                                    <span className="icon is-small">
                                        <i className="fa-solid fa-user-plus"></i>
                                    </span>
                                    <span>add participant</span>
                                </button>
                            </div>
                        </div>
                        <button
                            className="button is-success is-rounded is-small"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            <span className="icon is-small">
                                <i className="fa-solid fa-link"></i>
                            </span>
                            {nightOut.joinLinkCreated ? (
                                <span>show the join link</span>
                            ) : (
                                <span>create a join link</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <ModalCardComponent
                showModal={showModal}
                setShowModal={setShowModal}
                title="Create a join link"
                children={
                    <JoinLinkModalComponent
                        joinLinkCreated={nightOut.joinLinkCreated}
                        uuid={nightOut.uuid}
                        setJoinLinkPassword={setJoinLinkPassword}
                        joinLinkPassword={nightOut.joinLinkPassword}
                    />
                }
                click={() => createJoinLink(joinLinkPassword)}
            />
        </>
    )
}

export default AddParticipantButtonComponent
