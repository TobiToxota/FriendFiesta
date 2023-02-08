// local imports
import { usePutParticipantStatePlanning } from '../../../hooks/api/participantAPI'
import SendReminderComponent from '../universal/SendReminderComponent'

const FinishedPlanningButtonComponent = ({
    token,
    nightOut,
    participantInfos,
    refreshNightOut,
    participantLoading,
    userData,
}) => {
    // get the useputparticipantstateplanning hook
    const { putParticipantState, loading } = usePutParticipantStatePlanning(
        token,
        nightOut,
        refreshNightOut
    )

    return !participantLoading ? (
        <div className="mb-0 container has-text-centered mt-0" style={{ maxWidth: '800px' }}>
            <p className="has-text-centered is-size-7-touch">
                {!participantInfos.finishedPlanningPhase ? (
                    participantInfos.hasCreatedSuggestion ? (
                        <>
                            You created a suggestion. Are you done with it? Tell the other ones,
                            that you are finished with the planning phase:
                        </>
                    ) : (
                        <>
                            You didn't make a suggestion. That's not a problem, if you don't want to
                            make a suggestion, you can tell the other participants that you are done
                            with this phase:
                        </>
                    )
                ) : (
                    <>You declared that you are finished 😊</>
                )}
            </p>
            {!participantInfos.finishedPlanningPhase ? (
                !loading ? (
                    <button
                        className="button is-success is-rounded mt-2 fade-in is-size-7-touch mr-1"
                        onClick={() => putParticipantState()}
                    >
                        <span className="icon">
                            <i className="fa-regular fa-circle-check"></i>
                        </span>
                        <span className="">I'm finished</span>
                    </button>
                ) : (
                    <button className="button is-success is-rounded mt-2 fade-in is-size-7-touch is-loading mr-1">
                        <span className="icon">
                            <i className="fa-regular fa-circle-check"></i>
                        </span>
                        <span className="">I'm finished</span>
                    </button>
                )
            ) : (
                <button
                    className="button is-danger is-rounded mt-2 fade-in is-size-7-touch mr-1"
                    onClick={() => putParticipantState()}
                >
                    <span className="icon">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                    <span className="">I need to change something - I'm not finished</span>
                </button>
            )}
            {participantInfos.finishedPlanningPhase ?
             nightOut.creator.id === userData.id ? (
                <></>
            ) : (
                <SendReminderComponent nightOut={nightOut} token={token} />
            ) : (
                null
            )}
        </div>
    ) : null
}
export default FinishedPlanningButtonComponent
