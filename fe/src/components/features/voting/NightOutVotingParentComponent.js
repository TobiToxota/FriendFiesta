//local imports
import NightOutTopComponent from '../universal/NightOutTopComponent'
import VotingInfoComponent from './VotingInfoComponent'
import SelectSuggestionComponent from './SelectSuggestionComponent'
import SuggestionComponent from './SuggestionComponent'
import { useSuggestionCounter } from '../../../hooks/utilHooks/suggestionCounterHook'
import { useGetParticipantInfos } from '../../../hooks/api/participantAPI'

const NightOutVotingParentComponent = ({ nightOut, refreshNightOut, userData, token }) => {
    // get the useSuggestionCounter
    const { suggestionCounter, incrementSuggestionCounter, decrementSuggestionCounter } =
        useSuggestionCounter(nightOut)

    // get the participant infos
    const { getParticipantInfos, participantInfos } = useGetParticipantInfos(token, nightOut)

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
            <SelectSuggestionComponent
                nightOut={nightOut}
                suggestionCounter={suggestionCounter}
                incrementSuggestionCounter={incrementSuggestionCounter}
                decrementSuggestionCounter={decrementSuggestionCounter}
            />
            <SuggestionComponent
                suggestion={nightOut.planSuggestions[suggestionCounter]}
                userData={userData}
                refreshNightOut={refreshNightOut}
                token={token}
                getParticipantInfos={getParticipantInfos}
                nightOut={nightOut}
                participantInfos={participantInfos}
            />
        </>
    )
}

export default NightOutVotingParentComponent
