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
        <div className="ml-1 mb-0">
            <h3 className="label is-size-5 is-size-6-touch ml-1 mb-1 mt-1">
                Add a date suggestion
            </h3>
            <nav className="level">
                <div className="level-left">
                    <span
                        className="button is-rounded ml-0 is-size-7-mobile"
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
                                onClick={() => addDateSuggestion(createDateFromDatePicker(value))}
                            >
                                add
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AddDateComponent
