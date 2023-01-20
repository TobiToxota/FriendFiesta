// package imports
import React, { useState } from 'react'

// local imports
import NotificatonComponent from '../../common/NotificationComponent'
import { useAddParticipantToNightOut } from '../../../hooks/api/participantAPI'

const AddParticipantButtonComponent = ({
    nightOut,
    refreshNightOut,
    token,
}) => {
    const [addParticipantHandler, setAddParticipant] = useState(false)
    const { addParticipantToNightOut, error, success, setSuccess, setError } =
        useAddParticipantToNightOut(token, nightOut.uuid, refreshNightOut)

    return (
        <div className='is-inline-flex'>
            <button
                className="button is-success is-rounded ml-1 is-size-7-touch"
                onClick={() => setAddParticipant(true)}
            >
                <span className="icon is-small">
                    <i className="fa-solid fa-plus" />
                </span>
                <p>Add Participant</p>
            </button>
            {addParticipantHandler ? (
                <form
                    className="is-inline ml-1 fade-in"
                    id="addParticipantForm"
                    onSubmit={(e) => addParticipantToNightOut(e)}
                >
                    <div className="field is-inline">
                        <div className="control is-inline">
                            <input
                                className="input is-inline is-rounded is-size-7-touch margin-top-mobile"
                                type="email"
                                placeholder="Enter email"
                                style={{ width: '161px' }}
                                name="email"
                            />
                        </div>
                        <div className="control is-inline ml-1">
                            <button
                                className="button is-info is-rounded is-small mt-1"
                                type="submit"
                            >
                                add
                            </button>
                        </div>
                        <button
                            className="button is-danger is-rounded is-small mt-1 ml-1"
                            onClick={() => setAddParticipant(false)}
                        >
                            cancel
                        </button>
                    </div>
                    {error && (
                        <NotificatonComponent
                            msg={error}
                            animated={true}
                            onExit={() => setError(null)}
                        ></NotificatonComponent>
                    )}
                    {success && (
                        <NotificatonComponent
                            msg={success}
                            backgroundColor={'#48c78e'}
                            color={'white'}
                            animated={true}
                            onExit={() => setSuccess(null)}
                        ></NotificatonComponent>
                    )}
                </form>
            ) : null}
        </div>
    )
}

export default AddParticipantButtonComponent
