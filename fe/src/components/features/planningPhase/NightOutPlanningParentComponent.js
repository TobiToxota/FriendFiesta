// packages imports
import React, { useState } from 'react'

// local imports
import { useSwipeInFromTop } from '../../../hooks/animations/animations'
import NightOutTopComponent from '../universal/NightOutTopComponent'
import CreateSuggestionButtonComponent from './CreateSuggestionButtonComponent'
import CreateSuggestionFormComponent from './CreateSuggestionFormComponent'
import PlanningInfoComponent from './PlanningInfoComponent'

const NightOutPlanningParentComponent = ({
    nightOut,
    refreshNightOut,
    userData,
    token,
}) => {
    // animataion
    useSwipeInFromTop(NightOutPlanningParentComponent, '#main-container')

    // state for creating a suggestion
    const [createSuggestion, setCreateSuggestion] = useState(false)

    return (
        <>
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
                        finalDate={nightOut.finalDate}
                    />
                    <PlanningInfoComponent />
                    <CreateSuggestionButtonComponent
                        nightOut={nightOut}
                        token={token}
                        userData={userData}
                        setCreateSuggestion={setCreateSuggestion}
                        createSuggestion={createSuggestion}
                    />
                </div>
            </div>
            {createSuggestion && (
                <CreateSuggestionFormComponent nightOut={nightOut} token={token}/>
            )}
        </>
    )
}

export default NightOutPlanningParentComponent
