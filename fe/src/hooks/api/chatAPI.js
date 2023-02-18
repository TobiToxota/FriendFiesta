// package imports
import { useState } from 'react'
import { toast } from 'react-toastify'

const useAddChat = (refreshNightOut, token, uuid, animateNewMessage) => {
    const [addChatFetching, setAddChatFetching] = useState(false)

    const addChat = async (e) => {
        setAddChatFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightOut: uuid,
                content: e.target.content.value,
            }),
        })
        let thisMessage = await response.json()

        if (response.status === 201) {
            toast.success('Your Message was successfully added.', {
                autoClose: 2000,
            })
            refreshNightOut()
            animateNewMessage(thisMessage.id)
            setAddChatFetching(false)
        } else {
            toast.error('Something went wrong')
        }
    }

    return { addChat, addChatFetching }
}

export { useAddChat }
