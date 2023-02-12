// local imports
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'
import { useDeclareAbstention, useRemoveAbstention } from '../../../hooks/api/votingAPI'
import EntryViewHeaderComponent from './EntryViewHeaderComponent'
import EntryViewComponent from './EntryViewComponent'
import { useCreateNewVote } from '../../../hooks/api/votingAPI'

const SuggestionComponent = ({
    suggestion,
    token,
    userData,
    nightOut,
    refreshNightOut,
    getParticipantInfos,
    participantInfos,
    children,
}) => {
    // animation
    useSwipeInFromBottom(SuggestionComponent, '#suggestion-container')

    // get the useCreateNewVote hook
    const { createNewVote, newVoteFetching } = useCreateNewVote(
        token,
        refreshNightOut,
        getParticipantInfos,
        nightOut.uuid
    )
    // get the useDeclareAbstention hook
    const { declareAbstention, declareAbstentionFetching } = useDeclareAbstention(
        token,
        nightOut,
        refreshNightOut,
        getParticipantInfos
    )
    // get the useRemoveAbstention hook
    const { removeAbstention, removeAbstentionFetching } = useRemoveAbstention(
        token,
        nightOut,
        refreshNightOut,
        getParticipantInfos
    )

    return (
        <div className="container is-fluid active is-rounded" id="suggestion-container">
            <div
                className="notification is-light is-rounded shadow"
                style={{
                    marginTop: '0px !important',
                    paddingRight: '1.25rem',
                    borderBottomRightRadius: '15px',
                    borderBottomLeftRadius: '15px',
                    minHeight: 'auto',
                }}
                id="suggestion-container-box"
            >
                <div className="container has-text-centered">
                    <p className="heading">Creator of this suggestion</p>
                    <span className="button is-link is-rounded p-1 mr-2 is-size-7-mobile">
                        <img
                            className="is-inline"
                            src={`https://avatars.dicebear.com/api/${suggestion.creator.user.avatarStyle}/${suggestion.creator.user.username}+${suggestion.creator.user.avatarIteration}.svg`}
                            alt=""
                            width={30}
                        />
                    </span>
                    <p className="title is-inline is-size-5-mobile">
                        {userData.username === suggestion.creator.user.username &&
                            suggestion.creator.user.username + ' (you)'}
                        {userData.username !== suggestion.creator.user.username &&
                            suggestion.creator.user.username}
                    </p>
                </div>
                {suggestion.description && (
                    <div className="has-text-centered mt-2">
                        <p className="has-text-centered is-size-7-mobile is-inline has-text-weight-semibold">
                            Description:{' '}
                        </p>
                        <p className="has-text-centered is-size-7-mobile is-inline">
                            {suggestion.description}
                        </p>
                    </div>
                )}
                {!suggestion.description && (
                    <p className="has-text-centered is-size-7-mobile mt-2">
                        The creator of this suggestion hasn't added a description
                    </p>
                )}
                <EntryViewHeaderComponent suggestion={suggestion} />
                {suggestion.planEntries.map((entry, index) => (
                    <EntryViewComponent entry={entry} index={index} key={index} />
                ))}
                {participantInfos && (
                    <div className="container has-text-centered">
                        {participantInfos.votedForSuggestion_id === suggestion.id && (
                            <div className="container has-text-centered fade-in">
                                <span className="icon has-text-primary-dark is-size-4 is-size-5-touch mb-1">
                                    <i className="fa-regular fa-face-smile-wink" />
                                </span>

                                <p
                                    className="is-size-7-mobile has-text-weight-semibold mx-auto has-text-primary-dark"
                                    style={{ maxWidth: '520px' }}
                                >
                                    You voted for this suggestion. You want to vote for a different
                                    suggestion? No problem, just cast your vote for another
                                    suggestion.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="container has-text-centered">
                    {!participantInfos.votingAbstention &&
                        participantInfos.votedForSuggestion_id !== suggestion.id && (
                            <div className="field has-addons has-addons-centered fade-in">
                                <p className="control">
                                    {!newVoteFetching ? (
                                        <button
                                            className="button is-success is-rounded is-size-7-touch"
                                            onClick={() => createNewVote(suggestion.id)}
                                        >
                                            <span className="icon">
                                                <i className="fas fa-check-to-slot" />
                                            </span>
                                            <span>Vote for this suggestion</span>
                                        </button>
                                    ) : (
                                        <button className="button is-success is-rounded is-size-7-touch is-loading">
                                            <span className="icon">
                                                <i className="fas fa-check-to-slot" />
                                            </span>
                                            <span>Vote for this suggestion</span>
                                        </button>
                                    )}
                                </p>
                                <p className="control">
                                    {!declareAbstentionFetching ? (
                                        <button
                                            className="button is-rounded is-danger is-size-7-touch"
                                            onClick={() => declareAbstention()}
                                        >
                                            <span className="icon">
                                                <i className="fas fa-heart-crack" />
                                            </span>
                                            <span>Declare abstention</span>
                                        </button>
                                    ) : (
                                        <button className="button is-rounded is-danger is-small is-loading is-size-7-touch">
                                            <span className="icon">
                                                <i className="fas fa-heart-crack" />
                                            </span>
                                            <span>Declare abstention</span>
                                        </button>
                                    )}
                                </p>
                            </div>
                        )}
                    {participantInfos.votingAbstention && (
                        <>
                            <p className="label has-text-centered is-size-7-mobile mb-1">
                                You have stated to abstain from the voting phase.
                            </p>
                            <button
                                className="button is-rounded is-success is-size-7-touch"
                                onClick={() => removeAbstention()}
                            >
                                <span className="icon">
                                    <i className="fas fa-heart" />
                                </span>
                                <span>I no longer want to abstain</span>
                            </button>
                        </>
                    )}
                </div>

                {children}
            </div>
        </div>
    )
}

export default SuggestionComponent
