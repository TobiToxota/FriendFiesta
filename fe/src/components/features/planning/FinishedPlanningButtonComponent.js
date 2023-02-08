import { useGetParticipantInfos } from '../../../hooks/api/participantAPI'

const FinishedPlanningButtonComponent = ({ token, nightOut }) => {
    const { participantInfos, participantLoading } = useGetParticipantInfos(
        token,
        nightOut
    )

    console.log(participantInfos)

    return !participantLoading ? (
        <div className="container has-text-centered mt-2 mb-2">
            <p className="ml-2 has-text-centered">
                {!participantInfos.finishedPlanningPhase ? (
                    <>Tell the other ones, that you are finished with the planning phase:</>
                ) : (
                    <>Tell the other ones, that you are not finished</>
                )}
            </p>
            {!participantInfos.finishedPlanningPhase ? (
                    <button
                        className="button is-success is-rounded mt-2 fade-in"
                    >
                        <span className="icon">
                            <i className="fa-regular fa-circle-check"></i>
                        </span>
                        <span className="is-size-7-mobile">I'm finished</span>
                    </button>
                ) : (
                    <button
                        className="button is-danger is-rounded mt-2 fade-in"
                    >
                        <span className="icon">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </span>
                        <span className="is-size-7-mobile">I'm not finished</span>
                    </button>
                )}
        </div>
    ) : null
}
export default FinishedPlanningButtonComponent
