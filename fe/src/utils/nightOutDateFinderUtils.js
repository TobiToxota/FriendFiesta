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

export { createDateFromDatePicker }
