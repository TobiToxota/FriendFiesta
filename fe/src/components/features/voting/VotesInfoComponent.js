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
            <div className="has-text-centered mt-2">
                <p className="label is-size-6 is-size-7-mobile mb-0">
                    {nightOut.numberOfVotes} of {nightOut.participants.length} participants
                    have voted and {nightOut.numberOfAbstentions} abstention/s has/have been declared.
                </p>

                {participantInfos.votedForSuggestion_id !== 'no vote placed' ? (
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
                ) : !participantInfos.votingAbstention ? (
                    <p className="label is-size-6 is-size-7-mobile mb-0">
                        You have not yet cast your vote. Go for it 🚀
                    </p>
                ) : (
                    <p className="label is-size-6 is-size-7-mobile mb-0">
                        You allready declared that you are abstaining. <br />
                        If you want to change it, just vote for one suggestion.
                    </p>
                )}
            </div>
        )
    } else return null
}

export default VotesInfoComponent
