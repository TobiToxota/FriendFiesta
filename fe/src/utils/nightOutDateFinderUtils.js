/**
 * This Function checks if a user is the particpant and either returns a useable checkbox or an unusable checkbox
 *
 * @format
 */
const getCheckBoxStatus = (
    addParticipantDateToNightOut,
    participantDate,
    userData,
    working
) => {
    if (participantDate.participant.user.id === userData.id && !working) {
        return (
            <td key={participantDate.id} className="has-text-centered">
                <label className="checkbox fade-in">
                    <input
                        type="checkbox"
                        value={participantDate.id}
                        checked={participantDate.commit}
                        onChange={(e) => addParticipantDateToNightOut(e)}
                        onClick={(this) => change}
                    />
                </label>
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

export { getCheckBoxStatus, createDateFromDatePicker }
