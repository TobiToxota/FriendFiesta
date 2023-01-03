import React from "react"

import { useSwipeInFromLeft } from "../../hooks/animations/animations"

const CreateNightOutComponent = ({ userData, setCreation }) => {

    useSwipeInFromLeft(CreateNightOutComponent, "#main-container")

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
                <form onSubmit={console.log("@TODO:")}>
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
                    <div className="field has-addons">
                        <p className="control">
                            <input
                                className="input is-size-7-mobile"
                                type="number"
                                placeholder="# of People"
                                name="numberOfPersons"
                                min={0}
                                max={25}
                            />
                        </p>
                        <p className="control">
                            <button className="button is-static is-size-7-mobile">
                                # of Persons (You can add or remove later)
                            </button>
                        </p>
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