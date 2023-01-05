import { useState } from "react"

import { progressAnimation } from "../../hooks/animations/animations"

const ProgressComponent = (percentage) => {

    progressAnimation(percentage, ".progress", "#progressText",)

    const createText = (percentage) => {
        if (percentage === 25) {
            return (<p className="roboto is-inline ml-2">This Nightout is currently in the finding-a-date phase</p>);
        } else if (percentage === 50) {
            return (<p className="roboto is-inline ml-2">This Nightout is currently in the planning phase</p>)
        } else if (percentage === 75) {
            return (<p className="roboto is-inline ml-2">This Nightout is currently in the voting phase</p>)
        } else if (percentage === 100) {
            return (<p className="roboto is-inline ml-2">You finished the planning of your Nightout! Enjoy it!</p>)
        }
    }

    return (
        <div
            className="progress-container is-align-items-center has-text-centered"
            style={{ margin: "0px", padding: "0px" }}>
            <progress
                className="progress is-info"
                max="100"
                value={percentage}
                style={{ marginBottom: "4px" }}></progress>
            <div className="fluid is-inline-block is-justify-content-center" id="progressText">
                <i className="fa-solid fa-calendar-days is-inline"></i>
                {createText(percentage)}
            </div>
        </div>
    )

}