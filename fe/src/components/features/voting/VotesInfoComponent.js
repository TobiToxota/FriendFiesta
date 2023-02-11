// local imports
import { getSuggestionFromNightOut } from '../../../utils/nightOutVotingUtils'

const VotesInfoComponent = ({ nightOut, participantInfos, loaded }) => {
    return (
        <div className="has-text-centered mt-2">
            <p className="label is-size-5 is-size-6-mobile mb-0">
                {nightOut.numberOfVotes} of {nightOut.participants.length} participants have voted
                so far.
            </p>

            {loaded && participantInfos.votedForSuggestion_id !== 'no vote placed' ? (
                <p className="label is-size-5 is-size-6-mobile mb-0">
                    You voted for{' '}
                    {
                        getSuggestionFromNightOut(nightOut, participantInfos.votedForSuggestion_id)
                            .creator.user.username
                    }
                    's suggestion.
                </p>
            ) : (
                <p className="label is-size-5 is-size-6-mobile mb-0">
                    You have not yet cast your vote. Go for it 🚀
                </p>
            )}
        </div>
    )
}

export default VotesInfoComponent
