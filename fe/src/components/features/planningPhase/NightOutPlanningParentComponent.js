// packages imports
import React from 'react'

// local imports
import { useSwipeInFromTop } from '../../../hooks/animations/animations'
import NightOutTopComponent from '../universal/NightOutTopComponent'
import PlanningInfoComponent from './PlanningInfoComponent'

const NightOutPlanningParentComponent = ({
    nightOut,
    refreshNightOut,
    userData,
    token,
}) => {
    // animataion
    useSwipeInFromTop(NightOutPlanningParentComponent, '#main-container')

    return (
        <div
            className="container is-fluid active is-rounded"
            id="main-container"
        >
            <div
                className="notification is-light is-rounded fade-in shadow"
                style={{
                    marginTop: '6vh',
                    borderRadius: 15,
                    minHeight: '150px',
                }}
            >
                <NightOutTopComponent
                    nightOut={nightOut}
                    refreshNightOut={refreshNightOut}
                    userData={userData}
                    progressPercentage={50}
                />
                <PlanningInfoComponent/>
            </div>
        </div>
    )
}

export default NightOutPlanningParentComponent
