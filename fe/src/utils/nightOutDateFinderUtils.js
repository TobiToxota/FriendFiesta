/** This Functions gets a date from the datepicker package and creates a date as a string  */
const createDateFromDatePicker = (value) => {
    let date = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate()

    return date
}

/** This Functions gets a nightOut and returns how many participants have allready declared finishing  */
const getAllFinishedDatePhaseParticipantsCounts = (nightOut) => {
    let counter = 0

    nightOut.participants.forEach((participant) => {
        if (participant.finishedDatePhase) {
            counter++
        }
    })

    return counter
}

export { createDateFromDatePicker, getAllFinishedDatePhaseParticipantsCounts }
