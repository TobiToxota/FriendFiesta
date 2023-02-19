// package imports
import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

// local imports/common/NotificationComponent'
import { useAddDateSuggestionToNightOut } from '../../../hooks/api/participantAPI'
import { createDateFromDatePicker } from '../../../utils/nightOutDateFinderUtils'

const AddDateComponent = ({ token, nightOut, refreshNightOut, userData }) => {
    // states for datePicker
    const [value, onChange] = useState(new Date())

    // hook for addDateSuggestion
    const { addDateSuggestion } = useAddDateSuggestionToNightOut(
        token,
        nightOut.uuid,
        refreshNightOut
    )

    return (
        <>
            <div className="mt-4 is-hidden-mobile">
                <div className="field has-addons">
                    <span className="control">
                        <span className="is-not-clickable button is-size-7-mobile label">
                            Add a date Suggestion:
                        </span>
                    </span>
                    <span className="control">
                        <span
                            className="button ml-0 is-size-7-mobile"
                            id="date-buttons"
                            children={
                                <DatePicker
                                    onChange={onChange}
                                    value={value}
                                    style={{ border: 'none !important' }}
                                />
                            }
                        ></span>
                    </span>
                    <span className="control">
                        <div className="is-inline" id="addDateForm">
                            <div className="control is-inline">
                                <button
                                    className="button is-link is-rounded is-size-7-mobile"
                                    type="submit"
                                    id="date-buttons-two"
                                    onClick={() =>
                                        addDateSuggestion(createDateFromDatePicker(value))
                                    }
                                >
                                    <span className="icon is-small">
                                        <i className="fa-solid fa-calendar-plus"></i>
                                    </span>
                                    <span>add</span>
                                </button>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div className="mt-4 is-hidden-tablet">
                <div className="field has-addons">
                    <span className="control">
                        <span className="is-not-clickable button is-size-7-mobile label">
                            Add date:
                        </span>
                    </span>
                    <span className="control">
                        <span
                            className="button ml-0 is-size-7-mobile"
                            id="date-buttons"
                            children={
                                <DatePicker
                                    onChange={onChange}
                                    value={value}
                                    style={{ border: 'none !important' }}
                                />
                            }
                        ></span>
                    </span>
                    <span className="control">
                        <div className="is-inline" id="addDateForm">
                            <div className="control is-inline">
                                <button
                                    className="button is-link is-rounded is-size-7-mobile"
                                    type="submit"
                                    id="date-buttons-two"
                                    onClick={() =>
                                        addDateSuggestion(createDateFromDatePicker(value))
                                    }
                                >
                                    <span className="icon is-small">
                                        <i className="fa-solid fa-calendar-plus"></i>
                                    </span>
                                    <span>add</span>
                                </button>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </>
    )
}

export default AddDateComponent
