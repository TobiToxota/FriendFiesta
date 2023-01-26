import { useDeleteParticipantFromNightOut } from '../../../hooks/api/participantAPI'

const LeaveNightOutComponent = ({ nightOut, token }) => {
    // get the hook for leaving a nightout
    const { deleteParticipantFromNightOut, deleteFetching } = useDeleteParticipantFromNightOut(
        token,
        nightOut.uuid
    )

    return (
        <div className='container' style={{height: '25px'}}>
            {!deleteFetching ? (
            <button className="button is-danger is-rounded ml-1 is-small mt- is-clickable"
            onClick={() => deleteParticipantFromNightOut()}
            style={{float: 'right'}}>
                <span className="icon is-small">
                    <i className="fa-solid fa-person-through-window"></i>
                </span>
                <span>Leave</span>
            </button>
            ) : (
            <button className="button is-danger is-rounded ml-1 is-small is-pulled-right mt-0 is-loading">
                <span className="icon is-small">
                    <i className="fa-solid fa-person-through-window"></i>
                </span>
                <span>leave</span>
            </button>
            )}
        </div>
    )
}
export default LeaveNightOutComponent
