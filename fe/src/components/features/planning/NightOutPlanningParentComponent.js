// packages imports
import React from 'react'

// local imports
import { useSwipeInFromTop } from '../../../hooks/animations/animations'
import { useLoadSuggestion } from '../../../hooks/api/suggestionAPI'
import { useGetParticipantInfos } from '../../../hooks/api/participantAPI'
import NightOutTopComponent from '../universal/NightOutTopComponent'
import CreateSuggestionButtonComponent from './CreateSuggestionButtonComponent'
import PlanningInfoComponent from './PlanningInfoComponent'
import EditSuggestionFormComponent from './EditSuggestionFormComponent'
import NumberOfSuggestionsComponent from './NumberOfSuggestionsComponent'
import FinishedPlanningButtonComponent from './FinishedPlanningButtonComponent'

const NightOutPlanningParentComponent = ({ nightOut, refreshNightOut, userData, token }) => {
    // animataion
    useSwipeInFromTop(NightOutPlanningParentComponent, '#main-container')

    // get the Suggestion from the current user
    const { loadSuggestion, suggestionData } = useLoadSuggestion(token, nightOut.uuid)

    // get the participant infos
    const { participantInfos, participantLoading } = useGetParticipantInfos(token, nightOut)

    return (
        <>
            <div className="container is-fluid active is-rounded" id="main-container">
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
                    <NumberOfSuggestionsComponent nightOut={nightOut} />
                    <FinishedPlanningButtonComponent
                        nightOut={nightOut}
                        token={token}
                        participantInfos={participantInfos}
                        participantLoading={participantLoading}
                        refreshNightOut={refreshNightOut}
                        userData={userData}
                    />
                    {!suggestionData && (
                        <CreateSuggestionButtonComponent
                            nightOut={nightOut}
                            token={token}
                            loadSuggestion={loadSuggestion}
                            refreshNightOut={refreshNightOut}
                        />
                    )}
                </div>
            </div>
            {suggestionData && (
                <EditSuggestionFormComponent
                    nightOut={nightOut}
                    suggestionData={suggestionData}
                    loadSuggestion={loadSuggestion}
                    token={token}
                    refreshNightOut={refreshNightOut}
                />
            )}
        </>
    )
}

export default NightOutPlanningParentComponent
