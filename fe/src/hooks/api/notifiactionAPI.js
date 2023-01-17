import { useEffect, useState } from 'react'

/** This custom hook feteches the backend with an token and gets the notifications for a user */
const useGetNotifications = (token) => {
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifcations] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const getNotifications = async (token) => {
        let response = await fetch(
            process.env.REACT_APP_API_URL + 'notificationlist',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'applications/json',
                    Authorization: `Token ${token}`,
                },
            }
        )
        let thisData = await response.json()

        if (response.status === 200) {
            setNotifcations(thisData)
            setLoading(false)
            setSuccess('Notifications loaded')
        } else {
            setNotifcations(thisData)
            setLoading(false)
            setError('Notifcations cant be loaded')
        }
    }

    useEffect(() => {
        getNotifications(token)
    }, [token])

    return { getNotifications, notifications, loading, error, success }
}

/** This custom hook fetches the backend with an token and a notification number to dismiss a notification */
const usePatchNotification = (token, refreshNotifications) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const patchNotification = async (id) => {
        let response = await fetch(
            process.env.REACT_APP_API_URL + 'notification/',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    notification: id,
                    dismissed: true,
                }),
            }
        )

        if (response.status === 204) {
            setSuccess('Notification was dismissed')
            setTimeout(() => {
                refreshNotifications(token)
            }, 550)
        } else {
            setError('Something went wrong')
        }
    }
    return { patchNotification, error, success }
}

/** This custom hook fetches the backend witn an token and nightout-id and creates a notification for the creator */
const usePostNotification = (token, uuid) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const postNotification = async (notificationMessage) => {
        let response = await fetch(
            process.env.REACT_APP_API_URL + 'notification/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    nightout: uuid,
                    notificationMessage: notificationMessage,
                }),
            }
        )

        let thisData = await response.json()

        if (response.status === 201) {
            setSuccess('The reminder was successfully sent to the Creator.')
        } else {
            setError(thisData)
        }
    }
    return { postNotification, error, success }
}

export { useGetNotifications, usePatchNotification, usePostNotification }
