//local imports
import NightOutTopComponent from '../universal/NightOutTopComponent'
import VotingInfoComponent from './VotingInfoComponent'
import SelectSuggestionComponent from './SelectSuggestionComponent'
import { useSuggestionCounter } from '../../../hooks/utilHooks/suggestionCounterHook'

const NightOutVotingParentComponent = ({ nightOut, refreshNightOut, userData, token }) => {
    // get the useSuggestionCounter
    const { suggestionCounter, incrementSuggestionCounter, decrementSuggestionCounter } =
        useSuggestionCounter(nightOut)

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
                        userData={userData}
                        progressPercentage={75}
                        finalDate={nightOut.finalDate}
                    />
                    <VotingInfoComponent />
                </div>
            </div>
            <SelectSuggestionComponent nightOut={nightOut} />
        </>
    )
}

export default NightOutVotingParentComponent
