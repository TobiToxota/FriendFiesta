// local imports
import { useSwipeInFromTop } from "../../../hooks/animations/animations"

const FinishedNightOutComponent = ({ nightOut }) => {
    // animation
    useSwipeInFromTop(FinishedNightOutComponent, '#main-container')

    return (
        <div className="container is-fluid active is-rounded" id="main-container">
            <div
                className="notification is-light is-rounded shadow"
                style={{
                    marginTop: '50px',
                    paddingRight: '1.25rem',
                    borderRadius: 15,
                    minHeight: '400px',
                }}
                id="finished-night-out"
            >
                
            </div>
        </div>
    )
}

export default FinishedNightOutComponent
