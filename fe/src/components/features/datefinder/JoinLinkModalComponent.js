// package imports
import { toast } from "react-toastify";

// local imports
import { shaking } from "../../../hooks/animations/animations";

const JoinLinkModalComponent = ({joinLinkCreated, setJoinLinkPassword, uuid, joinLinkPassword}) => {
    const putIntoClipBoard = (link) => {
        navigator.clipboard.writeText(link);
        shaking('#cutter')
        toast.success("Link copied to clipboard");
    }

    return (
        !joinLinkCreated ? (
            <div className="field">
                <label className="label has-text-centered">
                    Set a password for joining the Nightout
                </label>
                <p className="has-text-centered">
                    Once you have set a password, you will receive a link that you can send to your
                    friends.
                </p>
                <p className="control has-icons-left mt-2">
                    <input
                        className="input"
                        type="text"
                        placeholder="Password"
                        onChange={(e) => setJoinLinkPassword(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock" />
                    </span>
                </p>
            </div>
        ) : (
            <div className="div">
                <label className="label has-text-centered">This is your join link:</label>
                <div className="control">
                    <div className="tags has-addons is-justify-content-center">
                        <span className="tag is-size-6 is-dark">Link:</span>
                        <span className="tag is-size-6">{'https://www.FriendFiesta.net/[...][...]/join'}</span>
                        <span className="tag is-size-6 is-clickable" id='cutter' onClick={() => putIntoClipBoard('https://www.friendfiesta.net/nightout/' + uuid + '/join')} >✂️</span>
                    </div>
                </div>
                <label className="label has-text-centered">Password: {joinLinkPassword}</label>
            </div>
        )
    )
}

export default JoinLinkModalComponent;