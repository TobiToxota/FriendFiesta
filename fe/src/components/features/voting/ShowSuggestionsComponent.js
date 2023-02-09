// package imports
import { useState } from "react";

// local imports
import { useSwipeInFromBottom } from "../../../hooks/animations/animations"

const ShowSuggestionsComponent = ({ nightOut, token, refreshNightOut, userData }) => {
    // animation
    useSwipeInFromBottom(ShowSuggestionsComponent, '#show-suggestion-container')

    return (
        <>
            <div className="container is-fluid active is-rounded" id="show-suggestion-container">
                <div
                    className="notification is-light is-rounded shadow"
                    style={{
                        marginTop: '0px !important',
                        borderRadius: 15,
                        minHeight: '150px',
                    }}
                ></div>
            </div>
        </>
    )
}

export default ShowSuggestionsComponent
