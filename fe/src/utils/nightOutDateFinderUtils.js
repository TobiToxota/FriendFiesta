import React, { useState } from 'react'

/**
 * This Function checks if a user is the particpant and either returns a useable checkbox or an unusable checkbox
 *
 * @format
 */
const CheckBoxComponent = (
    addParticipantDateToNightOut,
    participantDate,
    userData,
    working
) => {
    const [isClicked, setIsClicked] = useState(false)

    if (participantDate.participant.user.id === userData.id && !isClicked) {
        return (
            <td key={participantDate.id} className="has-text-centered">
                <label className="checkbox fade-in">
                    <input
                        type="checkbox"
                        value={participantDate.id}
                        checked={participantDate.commit}
                        onChange={(e) => addParticipantDateToNightOut(e)}
                        onClick={() => setIsClicked(true)}
                    />
                </label>
            </td>
        )
    } else if (isClicked) {
        return (
            <td key={participantDate.id} className="has-text-centered">
                <div className="lds-roller"></div>
            </td>
        )
    } else {
        return (
            <td key={participantDate.id} className="has-text-centered">
                <label className="checkbox fade-in">
                    <input
                        type="checkbox"
                        value={participantDate.id}
                        checked={participantDate.commit}
                        disabled
                    />
                </label>
            </td>
        )
    }
}

/** This Functions gets a date from the datepicker package and creates a date as a string  */
const createDateFromDatePicker = (value) => {
    let date =
        value.getFullYear() +
        '-' +
        (value.getMonth() + 1) +
        '-' +
        value.getDate()

    return date
}

export { CheckBoxComponent, createDateFromDatePicker }
