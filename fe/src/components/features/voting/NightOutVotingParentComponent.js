//local imports
import NightOutTopComponent from '../universal/NightOutTopComponent'
import VotingInfoComponent from './VotingInfoComponent'
import SelectSuggestionComponent from './SelectSuggestionComponent'
import SuggestionComponent from './SuggestionComponent'
import VotesInfoComponent from './VotesInfoComponent'
import NextPhaseComponent from './NextPhaseComponent'
import { useSuggestionCounter } from '../../../hooks/utilHooks/suggestionCounterHook'
import { useGetParticipantInfos } from '../../../hooks/api/participantAPI'

const NightOutVotingParentComponent = ({ nightOut, refreshNightOut, userData, token }) => {
    // get the participant infos
    const { getParticipantInfos, participantInfos, loaded } = useGetParticipantInfos(
        token,
        nightOut
    )

    // get the useSuggestionCounter
    const { suggestionCounter, incrementSuggestionCounter, decrementSuggestionCounter } =
        useSuggestionCounter(nightOut)

    if (loaded) {
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
                        <VotesInfoComponent
                            nightOut={nightOut}
                            participantInfos={participantInfos}
                            loaded={loaded}
                            token={token}
                            refreshNightOut={refreshNightOut}
                            getParticipantInfos={getParticipantInfos}
                        />
                        <VotingInfoComponent />
                    </div>
                </div>
                <SelectSuggestionComponent
                    nightOut={nightOut}
                    token={token}
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
                    children={
                        <NextPhaseComponent
                            nightOut={nightOut}
                            token={token}
                            refreshNightOut={refreshNightOut}
                            userData={userData}
                            participantInfos={participantInfos}
                        />
                    }
                />
            </>
        )
    } else return null
}

export default NightOutVotingParentComponent
