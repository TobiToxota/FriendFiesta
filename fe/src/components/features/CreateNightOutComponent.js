import React, { useContext, useEffect, useState } from "react"


const CreateNightOutComponent = (userData) => {
    let [isCreate, setIsCreate] = useState(false)

    if (!isCreate) {
        return (
            <div
                className="container is-widescreen is-fluid active visible"
                id="addcontainer-button"
                style={{ marginTop: "25vh" }}>
                <div className="container is-flex is-vcentered is-justify-content-center mb-1">
                    <img src="/logo_light.png" alt="" width={200} />
                </div>
                <div className="container is-flex is-vcentered is-justify-content-center mb-1 mt-4">
                    <h1 className="title is-2 roboto-plain" style={{ color: "white" }}>
                        Welcome {userData.userData.username}
                    </h1>
                </div>
                <div className="container is-flex is-vcentered is-justify-content-center">
                    <h2
                        className="subtitle mb-5 has-text-centered"
                        style={{ color: "white" }}>
                        Here you can plan your nightout with your friends, collegues or
                        family.
                    </h2>
                </div>
                <div className="container is-flex is-vcentered is-justify-content-center">
                    <button
                        className="button is-info is-light is-large is-rounded"
                        id="createButton" onClick={() => setIsCreate(true)}>
                        <span className="icon">
                            <i className="fa-solid fa-users" />
                        </span>
                        <span className="ml-1">Create a new Nightout</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default CreateNightOutComponent