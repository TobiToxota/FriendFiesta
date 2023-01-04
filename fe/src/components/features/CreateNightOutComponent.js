import React, { useState, useEffect } from "react"

import { useSwipeInFromLeft } from "../../hooks/animations/animations"
import { useCreateNightOut } from "../../hooks/api/nightOutAPI"
import NotificationComponent from "../common/NotificationComponent"

const CreateNightOutComponent = ({ userData, setCreation, token }) => {

    // animation
    useSwipeInFromLeft(CreateNightOutComponent, "#main-container")

    const { createNightOut, data, success, error } = useCreateNightOut(token)
    const [title, setTitle] = useState(null)

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
                            onChange={(e) => setTitle({ ...title, title: e.target.value })}
                        />
                    </div>
                </div>
                <div className="has-text-centered">
                    <button
                        className="button is-info is-rounded center"
                        style={{ margin: "auto" }}
                        onClick={() => createNightOut(title.title)}>
                        Create your Nightout
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreateNightOutComponent;