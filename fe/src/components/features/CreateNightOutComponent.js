import React, { useState } from "react"

import { useSwipeInFromLeft } from "../../hooks/animations/animations"
import { createNightOut } from "../../api/nightOutAPI"

const CreateNightOutComponent = ({ userData, setCreation, token }) => {

    // animation
    useSwipeInFromLeft(CreateNightOutComponent, "#main-container")

    // a state for success and error message of api call
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // calling the createNightOut and setting the error or success message
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const result = await createNightOut(e, token)
            if (result.success) {
                setSuccess(result.success)
            } else {
                setError(result.error)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div
            className="container is-fluid active is-rounded"
            id="main-container">
            <div
                className="notification is-light is-rounded"
                style={{ marginTop: "25vh", borderRadius: 15 }}>
                <i
                    className="fa-solid fa-xmark fa-xl is-clickable"
                    id="x"
                    onClick={() => setCreation(false)}
                />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="field is-justify-content-center">
                        <div className="container has-text-centered">
                            <img
                                className="image is-inline mr-2"
                                src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                                alt=""
                                width={35}
                            />
                            <label className="label is-size-5 has-text-centered is-inline-block">
                                {userData.username}´s next nightout
                            </label>
                        </div>
                    </div>
                    <div className="field is-justify-content-center">
                        <label className="label is-size-3 is-size-4-touch has-text-centered">
                            A nice title for your next Nightout?
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Title"
                                name="title"
                            />
                        </div>
                    </div>
                    <div className="has-text-centered">
                        <button
                            className="button is-info is-rounded center"
                            style={{ margin: "auto" }}>
                            Create your Nightout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNightOutComponent;