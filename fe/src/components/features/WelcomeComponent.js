import React from "react"

import { useSwipeInFromTop } from "../../hooks/animations/animations"

const WelcomeComponent = ({ userData, setCreation }) => {

    // animation
    useSwipeInFromTop(WelcomeComponent, "#addcontainer-button")

    return (
        <div
            className="container is-widescreen is-fluid active visible"
            id="addcontainer-button"
            style={{ marginTop: "25vh" }}>
            <div className="container is-flex is-vcentered is-justify-content-center mb-1">
                <img src="/logo_light.png" alt="" width={200} />
            </div>
            <div className="container is-flex is-vcentered is-justify-content-center mb-1 mt-4">
                <h1 className="title is-2 roboto-plain has-text-centered is-size-4-touch" style={{ color: "white" }}>
                    Welcome {userData.username}
                </h1>
            </div>
            <div className="container is-flex is-vcentered is-justify-content-center">
                <h2
                    className="subtitle mb-5 has-text-centered is-size-6-touch"
                    style={{ color: "white" }}>
                    Here you can plan your nightout with your friends, collegues or
                    family.
                </h2>
            </div>
            <div className="container is-flex is-vcentered is-justify-content-center">
                <button
                    className="button is-info is-light is-large is-rounded"
                    id="createButton" onClick={() => setCreation(true)}>
                    <span className="icon">
                        <i className="fa-solid fa-users" />
                    </span>
                    <span className="ml-1 is-size-5-touch">Create a new Nightout</span>
                </button>
            </div>
        </div>
    )
}

export default WelcomeComponent