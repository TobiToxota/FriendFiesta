// package imports
import { toast } from 'react-toastify'
import { useState } from 'react'

/** this custom hook fetches the backend to change the avatarStyle */
const useChangeAvatarStyle = (token, userData, refreshUserData) => {
    const [changeAvatarFetching, setChangeAvatarFetching] = useState(false)

    /** All avatar styles from dicebear */
    const avatarStyles = [
        'male',
        'female',
        'adventurer',
        'avataaars',
        'big-ears',
        'miniavs',
        'open-peeps',
        'pixel-art',
        'personas',
    ]

    const changeAvatarStyle = async (style) => {
        setChangeAvatarFetching(true)

        // check if the style is included in avatarStyles
        if (!avatarStyles.includes(style)) {
            toast.error('Invalid avatar style!')
            return
        }

        // check if the style is allready selected
        if (userData.avatarStyle === style) {
            toast.error('This style is already selected!')
            setChangeAvatarFetching(false)
            return
        }

        let response = await fetch(process.env.REACT_APP_API_URL + 'user/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                avatarStyle: style,
            }),
        })
        if (response.status === 200) {
            toast.success('Avatar style changed successfully!')
            refreshUserData(token)
            setChangeAvatarFetching(false)
        } else {
            toast.error('Something went wrong!')
            setChangeAvatarFetching(false)
        }
    }

    return { changeAvatarStyle, avatarStyles, changeAvatarFetching }
}

/** this custom hook fetches the backend to add a avatar Iteration */
const useAddAvatarIteration = (token, userData, refreshUserData) => {
    const [addIterationFetching, setAddIterationFetching] = useState(false)

    const addAvatarIteration = async () => {
        setAddIterationFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'user/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                avatarIteration: userData.avatarIteration + 1,
            }),
        })
        if (response.status === 200) {
            toast.success('New avatar created, based on your selected style!', { autoClose: 400 })
            setAddIterationFetching(false)
            refreshUserData(token)
        } else {
            toast.error('Something went wrong!')
            setAddIterationFetching(false)
        }
    }

    return { addAvatarIteration, addIterationFetching }
}

export { useChangeAvatarStyle, useAddAvatarIteration }
