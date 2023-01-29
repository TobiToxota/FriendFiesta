import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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
            }, 200)
        } else {
            setError('Something went wrong')
        }
    }
    return { patchNotification, error, success }
}

/** This custom hook fetches the backend witn an token and nightout-id and creates a notification for the creator */
const usePostNotification = (token, uuid) => {
    const [notificationError, setNotificationError] = useState(null)
    const [notificationSuccess, setNotificationSuccess] = useState(null)
    const [fetching, setFetching] = useState(false)

    const postNotification = async (notificationMessage) => {
        setFetching(true)

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
            setNotificationSuccess(
                'The reminder was successfully sent to the Creator.'
            )
            toast.success('The reminder was successfully sent to the Creator', {
                autoClose: 2000,
            })
            setTimeout(() => {
                setFetching(false)
            }, 400)
        } else {
            toast.error(thisData.message, {
                autoClose: 2000,
            })
            setTimeout(() => {
                setFetching(false)
            }, 400)
        }
    }
    return {
        postNotification,
        notificationError,
        notificationSuccess,
        fetching,
        setNotificationError,
        setNotificationSuccess,
    }
}

export { useGetNotifications, usePatchNotification, usePostNotification }
