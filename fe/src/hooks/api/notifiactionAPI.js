/** This custom hook feteches the backend with an token and gets the notifications for a user */
const useGetNotifications = (token) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
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
            setData(thisData)
            setLoading(false)
            setSuccess('Notifications loaded')
        } else {
            setData(thisData)
            setLoading(false)
            setError('Notifcations cant be loaded')
        }
    }

    return { getNotifications, data, loading, error, success }
}

export default useGetNotifications;