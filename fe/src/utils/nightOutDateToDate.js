const nightOutDateToDate = (date) => {
    let dateArray = date.split('-')
    let newDate =
        '' +
        dateArray[2].substring(0, 2) +
        '.' +
        dateArray[1] +
        '.' +
        dateArray[0]
    return newDate
}

export {nightOutDateToDate}
