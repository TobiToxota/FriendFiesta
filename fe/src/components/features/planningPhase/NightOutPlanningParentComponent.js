// packages imports
import React, { useState } from 'react'

// local imports
import { useSwipeInFromTop } from '../../../hooks/animations/animations'
import { useLoadSuggestion } from '../../../hooks/api/suggestionAPI'
import NightOutTopComponent from '../universal/NightOutTopComponent'
import CreateSuggestionButtonComponent from './CreateSuggestionButtonComponent'
import CreateSuggestionFormComponent from './CreateSuggestionFormComponent'
import PlanningInfoComponent from './PlanningInfoComponent'
import EditSuggestionFormComponent from './EditSuggestionFormComponent'
import NumberOfSuggestionsComponent from './NumberOfSuggestionsComponent'

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

    // get the Suggestion from the current user
    const { loadSuggestion, suggestionLoading, suggestionData } = useLoadSuggestion(
        token,
        nightOut.uuid
    )

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
                        children={<NumberOfSuggestionsComponent nightOut={nightOut}/>}
                    />
                    <PlanningInfoComponent />
                    {!suggestionData && (
                        <CreateSuggestionButtonComponent
                            nightOut={nightOut}
                            token={token}
                            userData={userData}
                            setCreateSuggestion={setCreateSuggestion}
                            createSuggestion={createSuggestion}
                            suggestionLoading={suggestionLoading}
                            suggestionData={suggestionData}
                        />
                    )}
                </div>
            </div>
            {createSuggestion && !suggestionData && (
                <CreateSuggestionFormComponent
                    nightOut={nightOut}
                    token={token}
                    setCreateSuggestion={setCreateSuggestion}
                    loadSuggestion={loadSuggestion}
                />
            )}
            {suggestionData && (
                <EditSuggestionFormComponent nightOut={nightOut}/>
            )}
        </>
    )
}

export default NightOutPlanningParentComponent
