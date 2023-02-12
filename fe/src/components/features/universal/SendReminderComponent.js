// local Imports
import { usePostNotification } from '../../../hooks/api/notifiactionAPI'

const SendReminderComponent = ({ token, nightOut}) => {
    // get the hook for postNotification
    const { postNotification, fetching } = usePostNotification(token, nightOut.uuid)

    return !fetching ? (
        <button
            className="button is-link is-rounded mt-1 is-size-7-touch"
            onClick={() => postNotification('ask_next_phase')}
        >
            <span className="icon is-small">
                <i className="fa-solid fa-bell"></i>
            </span>
            <span>Send a reminder to the creator</span>
        </button>
    ) : (
        <>
            <button className="button is-link is-rounded mt-1 is-loading is-size-7-touch">
                <span className="icon is-small">
                    <i className="fa-solid fa-bell"></i>
                </span>
                <span className="is-size-7">Send a reminder to the creator</span>
            </button>
        </>
    )
}

export default SendReminderComponent
