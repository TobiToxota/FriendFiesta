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
const makeDateBeautifull = (date) => {
    let newDate = date.slice(0, 5)
    return newDate
}

export { splitLocationType, makeDateBeautifull }
