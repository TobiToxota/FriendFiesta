// package imports
import { useState } from 'react'
import { toast } from 'react-toastify'

const useAddChat = (refreshNightOut, token, uuid) => {
    const [addChatFetching, setAddChatFetching] = useState(false)

    const addChat = async (e) => {
        e.preventDefault()
        setAddChatFetching(true)

        let response = await fetch(process.env.REACT_APP_API_URL + 'chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                nightout: uuid,
                content: e.target.content.value,
            }),
        })
        let thisMessage = await response.json()

        if (response.status === 201) {
            toast.success('Your Message was successfully added.', {
                autoClose: 2000,
            })
            refreshNightOut(uuid)
            setAddChatFetching(false)
        } else {
            toast.error('Something went wrong')
            setAddChatFetching(false)
        }
    }

    return { addChat, addChatFetching }
}

const useDeleteChat = (refreshNightOut, token, uuid) => {

    const deleteChat = async (id) => {

        let response = await fetch(process.env.REACT_APP_API_URL + 'chat/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `token ${token}`,
            },
            body: JSON.stringify({
                id: id,
                nightout: uuid,
            }),
        })
        if (response.status === 204) {
            toast.success('Your Message was successfully deleted.', {
                autoClose: 2000,
            })
            refreshNightOut(uuid)
        } else {
            toast.error('Something went wrong')
        }
    }
    return { deleteChat }
}

export { useAddChat, useDeleteChat }
