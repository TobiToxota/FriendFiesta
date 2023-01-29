import { usePutParticipantState, useGetParticipantInfos } from '../../../hooks/api/participantAPI'

const CommitDateButtonComponent = ({ token, nightOut, refreshNightOut }) => {
    const { getParticipantInfos, participantInfos, participantLoading } = useGetParticipantInfos(
        token,
        nightOut
    )

    const { putParticipantState, loading } = usePutParticipantState(
        token,
        nightOut,
        refreshNightOut,
        getParticipantInfos
    )

    return !participantLoading ? (
        <div className="container has-text-centered mt-4 mb-2">
            <p className="label is-size-5 mb-0">
                {!participantInfos.finishedDatePhase ? (
                    <>You're done checking off the dates you can attend?</>
                ) : (
                    <>You're not done checking off the dates you can attend?</>
                )}
            </p>
            <p className="ml-2 has-text-centered">
            {!participantInfos.finishedDatePhase ? (
                <>
                Tell the other ones, that you are finished:</> ) : (
                    <>
                    Tell the other ones, that you are not finished</>
                )}
                </p>
            {!loading ? (
                !participantInfos.finishedDatePhase ? (
                    <button
                        className="button is-success is-rounded mt-1 fade-in"
                        onClick={() => putParticipantState()}
                    >
                        <span className="icon">
                            <i className="fa-regular fa-circle-check"></i>
                        </span>
                        <span className="is-size-7-mobile">I'm finished</span>
                    </button>
                ) : (
                    <button
                        className="button is-danger is-rounded mt-1 fade-in"
                        onClick={() => putParticipantState()}
                    >
                        <span className="icon">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                        <span className="is-size-7-mobile">I'm not finished</span>
                    </button>
                )
            ) : (
                <button
                    className="button is-primary is-rounded mt-1 is-loading"
                    onClick={() => putParticipantState()}
                >
                    <span className="icon">
                        <i className="fa-regular fa-circle-check"></i>
                    </span>
                    <span className="is-size-7-mobile">I'm finished</span>
                </button>
            )}
        </div>
    ) : (
        <></>
    )
}

export default CommitDateButtonComponent
