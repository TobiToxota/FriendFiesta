// local imports
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'
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
                        {participantInfos.votedForSuggestion_id !== suggestion.id && (
                            !newVoteFetching? (
                            <button
                                className="button is-success is-rounded is-size-7-touch fade-in"
                                onClick={() => createNewVote(suggestion.id)}
                            >
                                <span className="icon is-large pl-1 mr-3">
                                    <i className="fas fa-check-to-slot is-size-5-desktop" />
                                </span>
                                <span>I want to vote for this suggestion</span>
                            </button>
                            ) : (
                                <button
                                className="button is-success is-rounded is-size-7-touch fade-in is-loading"
                            >
                                <span className="icon is-large pl-1 mr-3">
                                    <i className="fas fa-check-to-slot is-size-5-desktop" />
                                </span>
                                <span>I want to vote for this suggestion</span>
                            </button>
                            )
                        )}
                        {participantInfos.votedForSuggestion_id === suggestion.id && (
                            <div className="container has-text-centered fade-in">
                                <span className="icon has-text-primary-dark is-size-4 is-size-5-touch mb-1">
                                    <i className="fa-regular fa-face-smile-wink" />
                                </span>

                                <p
                                    className="is-size-7-mobile has-text-weight-semibold mx-auto"
                                    style={{ maxWidth: '470px' }}
                                >
                                    You voted for this suggestion. You want to vote for another one?
                                    No problem, just cast your vote for another suggestion.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SuggestionComponent
