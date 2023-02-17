// local imports
import { useSwipeInFromTop } from "../../../hooks/animations/animations"
import NightOutTopComponent from "../universal/NightOutTopComponent"
import FinalDateComponent from "./FinalDateComponent"

const FinishedNightOutComponent = ({ nightOut, userData }) => {
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
                    minHeight: 'auto',
                }}
                id="finished-night-out"
            >   
            <NightOutTopComponent nightOut={nightOut} userData={userData} progressPercentage={100}/>
            <FinalDateComponent finalDate={nightOut.finalDate}/>
            </div>
        </div>
    )
}

export default FinishedNightOutComponent
