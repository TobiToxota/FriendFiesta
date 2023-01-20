// package imports
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

// local imports
import NotificatonComponent from '../../common/NotificationComponent'
import {
    useAddDateSuggestionToNightOut,
    useDeleteParticipantFromNightOut,
} from '../../../hooks/api/participantAPI'
import { createDateFromDatePicker } from '../../../utils/nightOutDateFinderUtils'

const AddDateComponent = ({ token, nightOut, refreshNightOut, userData }) => {
    // states for datePicker
    const [datePicker, setDatePicker] = useState(false)
    const [value, onChange] = useState(new Date())

    // hook for addDateSuggestion
    const { addDateSuggestion, dateError, setDateError, success, setSuccess } =
        useAddDateSuggestionToNightOut(token, nightOut.uuid, refreshNightOut)
    const { deleteParticipantFromNightOut, deleteFetching } =
        useDeleteParticipantFromNightOut(token, nightOut.uuid)

    return (
        <>
            <h3 className="label is-size-4 is-size-5-touch mb-2 mt-4">
                Find a date for your Nightout:
            </h3>
            {nightOut.creator.id !== userData.id &&
                (!deleteFetching ? (
                    <button
                        className="button is-danger is-rounded ml-1"
                        onClick={() => deleteParticipantFromNightOut()}
                    >
                        <span className="icon is-small">
                            <i className="fa-solid fa-person-through-window"></i>
                        </span>
                        <span className="is-size-7">Leave this Nightout</span>
                    </button>
                ) : (
                    <button className="button is-danger is-rounded ml-1 is-loading">
                        <span className="icon is-small">
                            <i className="fa-solid fa-person-through-window"></i>
                        </span>
                        <span className="is-size-7">Leave this Nightout</span>
                    </button>
                ))}
            <button
                className="button is-success is-rounded ml-1 margin-top-mobile"
                onClick={() => setDatePicker(true)}
            >
                <span className="icon is-small">
                    <i className="fa-solid fa-plus"></i>
                </span>
                <span className="is-size-6 is-size-7-touch">
                    Add a new date suggestion
                </span>
            </button>
            {datePicker && (
                <>
                    <span
                        className="button is-warning is-rounded ml-1 margin-top-mobile is-size-7-mobile"
                        id="date-buttons"
                        children={
                            <DatePicker
                                onChange={onChange}
                                value={value}
                                style={{ border: 'none !important' }}
                            />
                        }
                    ></span>
                    <div className="fade-in is-inline" id="addDateForm">
                        <div className="control is-inline ml-1">
                            <button
                                className="button is-info is-rounded is-small mt-1 margin-top-mobile"
                                type="submit"
                                id="date-buttons-two"
                                onClick={() =>
                                    addDateSuggestion(
                                        createDateFromDatePicker(value)
                                    )
                                }
                            >
                                add
                            </button>
                        </div>
                        <button
                            className="button is-danger is-rounded is-small mt-1 ml-1 margin-top-mobile"
                            onClick={() => {
                                setDatePicker(false)
                            }}
                            id="date-buttons-two"
                        >
                            cancel
                        </button>
                    </div>
                    {success && (
                        <>
                            <NotificatonComponent
                                msg={success}
                                animated={true}
                                backgroundColor={'#48c78e'}
                                color={'white'}
                                onExit={() => setSuccess()}
                            ></NotificatonComponent>
                        </>
                    )}
                    {dateError && (
                        <NotificatonComponent
                            msg={dateError}
                            onExit={() => setDateError()}
                            animated={true}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default AddDateComponent
