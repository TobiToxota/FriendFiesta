// local imports
import { getSuggestionFromNightOut } from '../../../utils/nightOutVotingUtils'

const VotesInfoComponent = ({
    nightOut,
    participantInfos,
    loaded,
    refreshNightOut,
    getParticipantInfos,
    token,
}) => {
    if (loaded) {
        return (
            <div className="has-text-centered mt-3">
                <p className="label is-size-6 is-size-7-mobile mb-0">
                    {nightOut.numberOfVotes} of {nightOut.participants.length} participants have
                    voted and {nightOut.numberOfAbstentions} of {nightOut.participants.length} participants indicated that they will abstain.<br/>
                    Accordingly, {nightOut.numberOfVotes + nightOut.numberOfAbstentions} participants have already completed this phase.
                </p>

                {participantInfos.votedForSuggestion_id !== 'no vote placed' && (
                    <p className="label is-size-5 is-size-6-mobile mb-0">
                        You voted for{' '}
                        {
                            getSuggestionFromNightOut(
                                nightOut,
                                participantInfos.votedForSuggestion_id
                            ).creator.user.username
                        }
                        's suggestion.
                    </p>
                )}
            </div>
        )
    } else return null
}

export default VotesInfoComponent
