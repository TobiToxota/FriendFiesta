// local imports
import { useAddChat } from "../../../hooks/api/chatAPI"

const AddToChatComponent = ({ refreshNightOut, uuid, userData, token }) => {

    // get the useAddChat
    const { addChat, addChatFetching } = useAddChat(refreshNightOut, token, uuid)

    return (
        <div className="container">
            <form onSubmit={(e) => addChat(e)}>
            <article className="media mx-auto mt-4 pt-2" style={{ maxWidth: '1000px', borderTop: '1px solid #e8e8e8'}}>
                <figure className="media-left my-auto">
                    <p className="image">
                        <img
                        className="mx-auto"
                            src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                            alt="UserAvatar"
                            style={{ height: '50px', width: '50px' }}
                        />
                    </p>
                    <p className="label is-size-7">{userData.username}</p>
                </figure>
                <div className="media-content my-auto">
                    <div className="field">
                        <p className="control">
                            <textarea
                                className="textarea"
                                id="textarea-chat"
                                placeholder="Add a comment..."
                                defaultValue={''}
                                style={{ minHeight: '50px' }}
                                name='content'
                            />
                        </p>
                    </div>
                </div>
                <div className="media-right my-auto ml-1">
                    {!addChatFetching ? (
                    <button className="button is-rounded is-dark">
                        <span className="icon">
                            <i className="far fa-paper-plane" />
                        </span>
                    </button>
                    ) : (
                        <button className="button is-rounded is-dark is-loading">
                        <span className="icon">
                            <i className="far fa-paper-plane" />
                        </span>
                    </button> 
                    )}
                </div>
            </article>
            </form>
        </div>
    )
}

export default AddToChatComponent
