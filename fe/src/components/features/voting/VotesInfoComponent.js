// local imports
import { getSuggestionFromNightOut } from '../../../utils/nightOutVotingUtils'
import { useDeclareAbstention } from '../../../hooks/api/votingAPI'

const VotesInfoComponent = ({
    nightOut,
    participantInfos,
    loaded,
    refreshNightOut,
    getParticipantInfos,
    token,
}) => {
    // get the useDeclareAbstention hook
    const { declareAbstention, declareAbstentionFetching } = useDeclareAbstention(
        token,
        nightOut,
        refreshNightOut,
        getParticipantInfos
    )

    if (loaded) {
        return (
            <div className="has-text-centered mt-2">
                <p className="label is-size-5 is-size-6-mobile mb-0">
                    {nightOut.numberOfVotes} of {nightOut.participants.length} participants have
                    voted so far.
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
                    <p className="label is-size-5 is-size-6-mobile mb-0">
                        You have not yet cast your vote. Go for it 🚀
                    </p>
                ) : (
                    <p className="label is-size-5 is-size-6-mobile mb-0">
                        You allready declared that you are abstaining. <br/>If you want to change it,
                        just vote for one suggestion.
                    </p>
                )}
                {!participantInfos.votingAbstention && (
                    <>
                        <p className="label is-size-6 is-size-7-mobile mt-1 mb-1">
                            Actually, you don't like one suggestion and you'd rather abstain?
                        </p>
                        {!declareAbstentionFetching ? (
                            <button
                                className="button is-rounded is-danger is-small"
                                onClick={() => declareAbstention()}
                            >
                                <span className="icon">
                                    <i className="fas fa-heart-crack" />
                                </span>
                                <span>Declare abstention</span>
                            </button>
                        ) : (
                            <button className="button is-rounded is-danger is-small is-loading">
                                <span className="icon">
                                    <i className="fas fa-heart-crack" />
                                </span>
                                <span>Declare abstention</span>
                            </button>
                        )}
                    </>
                )}
            </div>
        )
    } else return null
}

export default VotesInfoComponent
