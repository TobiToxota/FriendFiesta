import { usePutParticipantState } from '../../../hooks/api/participantAPI'

const CommitDateButtonComponent = ({ token, nightOut, refreshNightOut }) => {
    const { putParticipantState, loading } = usePutParticipantState(
        token,
        nightOut,
        refreshNightOut
    )

    return (
        <div className="container has-text-centered mt-4">
            <p className="label is-size-5 mb-0">
                You're done checking off the dates you can attend?
            </p>
            <p className="ml-2 has-text-centered">Tell the other ones, that you are finished:</p>
            {!loading ? (
                <button
                    className="button is-primary is-rounded mt-1"
                    onClick={() => putParticipantState()}
                >
                    <span className="icon">
                        <i className="fa-solid fa-flag-checkered"></i>
                    </span>
                    <span className="is-size-7-mobile">I'm finished</span>
                </button>
            ) : (
                <button
                    className="button is-primary is-rounded mt-1 is-loading"
                    onClick={() => putParticipantState()}
                >
                    <span className="icon">
                        <i className="fa-solid fa-flag-checkered"></i>
                    </span>
                    <span className="is-size-7-mobile">I'm finished</span>
                </button>
            )}
        </div>
    )
}

export default CommitDateButtonComponent
