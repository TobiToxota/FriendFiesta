// package imports
import { useState } from 'react'

// package imports
import { toast } from 'react-toastify'

const useChangeAvatarStyle = (token, userData, getUserData) => {
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
        // check if the style is included in avatarStyles
        if (!avatarStyles.includes(style)) {
            toast.error('Invalid avatar style!')
            return
        }

        let response = await fetch(process.env.REACT_APP_API_URL + 'user/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                userName: userData.userName,
                email: userData.email,
                avatarStyle: style,
            }),
        })
        if (response.status === 201) {
            toast.success('Avatar style changed successfully!')
            getUserData()
        } else {
            toast.error('Something went wrong!')
        }
    }

    return { changeAvatarStyle, avatarStyles }
}

export { useChangeAvatarStyle } 
