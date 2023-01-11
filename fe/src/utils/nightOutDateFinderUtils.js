/**
 * This Function checks if a user is the particpant and either returns a useable checkbox or an unusable checkbox
 *
 * @format
 */
const getCheckBoxStatus = (participantDate, userData, addParticipantDate) => {
    if (participantDate.participant.user.id === userData.id) {
        return (
            <td key={participantDate.id} className="has-text-centered">
                <label className="checkbox fade-in2">
                    <input
                        type="checkbox"
                        value={participantDate.id}
                        checked={participantDate.commit}
                        onChange={addParticipantDate}
                    />
                </label>
            </td>
        )
    } else {
        return (
            <td key={participantDate.id} className="has-text-centered">
                <label className="checkbox fade-in2">
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

export { getCheckBoxStatus, createDateFromDatePicker }
