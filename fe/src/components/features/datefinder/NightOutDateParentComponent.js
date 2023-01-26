/** @format */

// packages import
import React, { useState } from 'react'

// local imports
import NightOutTopComponent from '../universal/NightOutTopComponent'
import AddParticipantButtonComponent from './AddParticipantButtonComponent'
import DateFinderInfoComponent from './DateFinderInfoComponent'
import DateTableComponent from './DateTableComponent'
import AddDateComponent from './AddDateButtonComponent'
import AddFinalDateButtonComponent from './AddFinalDateButtonComponent'
import LeaveNightOutComponent from './LeaveNightOutComponent'
import SpinnerComponent from '../../common/SpinnerComponent'
import { useSwipeInFromTop } from '../../../hooks/animations/animations'
import CommitDateButtonComponent from './CommitDateButtonComponent'

const NightOutDateParentComponent = ({ nightOut, refreshNightOut, userData, token }) => {
    // animation
    useSwipeInFromTop(NightOutDateParentComponent, '#main-container')
    const [addFinalDateLoading, setAddFinalDateLoading] = useState(false)

    return (
        <>
            {!addFinalDateLoading ? (
                <div className="container is-fluid active is-rounded" id="main-container">
                    <div
                        className="notification is-light is-rounded fade-in shadow"
                        style={{
                            marginTop: '6vh',
                            borderRadius: 15,
                            minHeight: '150px',
                        }}
                        id="nightout-container"
                    >
                        {userData.id !== nightOut.creator.id && (
                            <LeaveNightOutComponent nightOut={nightOut} token={token} />
                        )}
                        <NightOutTopComponent
                            nightOut={nightOut}
                            refreshNightOut={refreshNightOut}
                            userData={userData}
                            progressPercentage={25}
                        />
                        <DateFinderInfoComponent />
                        <AddDateComponent
                            token={token}
                            nightOut={nightOut}
                            refreshNightOut={refreshNightOut}
                            userData={userData}
                        />
                        <DateTableComponent
                            nightOut={nightOut}
                            refreshNightOut={refreshNightOut}
                            token={token}
                            userData={userData}
                        />
                        <AddParticipantButtonComponent
                            nightOut={nightOut}
                            token={token}
                            refreshNightOut={refreshNightOut}
                        />
                        <CommitDateButtonComponent
                            nightOut={nightOut}
                            token={token}
                            refreshNightOut={refreshNightOut}
                        />
                        <AddFinalDateButtonComponent
                            nightOut={nightOut}
                            refreshNightOut={refreshNightOut}
                            userData={userData}
                            token={token}
                            setAddFinalDateLoading={setAddFinalDateLoading}
                        />
                    </div>
                </div>
            ) : (
                <SpinnerComponent />
            )}
        </>
    )
}

export default NightOutDateParentComponent
