/** A function which checks how many notifications a user has and returns True if it is more than 0 */
const notificationsLength = (notifications) => {
    if (notifications.length > 0) {
        return true
    } else {
        return false
    }
}

export default notificationsLength
