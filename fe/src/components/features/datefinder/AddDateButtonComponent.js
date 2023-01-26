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
        <div className='ml-1'>
            <h3 className="label is-size-5 is-size-6-touch ml-1 mb-1 mt-1">
                Add a date suggestion
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
                <nav className='level'>
                <div class="level-left">
                    <span
                        className="button is-warning is-rounded ml-0 is-size-7-mobile"
                        id="date-buttons"
                        children={
                            <DatePicker
                                onChange={onChange}
                                value={value}
                                style={{ border: 'none !important' }}
                            />
                        }
                    ></span>
                    <div className="is-inline" id="addDateForm">
                        <div className="control is-inline ml-1">
                            <button
                                className="button is-info is-rounded is-small"
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
                            className="button is-danger is-rounded is-small ml-1"
                            onClick={() => {
                                setDatePicker(false)
                            }}
                            id="date-buttons-two"
                        >
                            cancel
                        </button>
                    </div>
                    </div>
                </nav>
        </div>
    )
}

export default AddDateComponent
