/** This Functions takes a locaton string and splits it  */
const splitLocationType = (location) => {
    var array = location.split(',', 2)
    var newString = ''
    array.forEach((entry, index) => {
        newString += entry
        if (index < array.length - 1) {
            newString += ' and '
        }
    })
    return newString
}

/** This Functions takes a date and slices the last digits off  */
const makeDateBeautiful = (date) => {
    let newDate = date.slice(0, 5)
    return newDate
}

/** This Function takes a Nightout and returns how many people have declared that they are finished */
const countPeopleFinished = (nightOut) => {
    let finished = 0
    nightOut.participants.forEach((participant) => {
        if (participant.finishedPlanningPhase) {
            finished += 1
        }
    })
    return finished
}

export { splitLocationType, makeDateBeautiful, countPeopleFinished }
