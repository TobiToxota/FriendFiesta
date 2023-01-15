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

export default useGetNotifications
