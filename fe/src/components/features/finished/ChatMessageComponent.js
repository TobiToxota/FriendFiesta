// local imports
import { shaking } from "../../../hooks/animations/animations"

const ChatMessageComponent = ({ userData, message, deleteChat, index, nightOut }) => {
  
    return message.creator.user.username === userData.username ? (
        <article className="media mt-3 mx-auto pb-2" style={{ maxWidth: '1000px' }} key={index} id={'chat-message'}>
            <figure className="media-left my-auto">
                <p className="image">
                    <img
                        src={`https://avatars.dicebear.com/api/${message.creator.user.avatarStyle}/${message.creator.user.username}+${message.creator.user.avatarIteration}.svg`}
                        style={{ height: '50px', width: '50px' }}
                        className="mx-auto"
                        alt="participant avatar"
                    />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{message.creator.user.username}</strong>{' '}
                        <small> {message.timespan}</small>
                        <br />
                        {message.content}
                    </p>
                </div>
            </div>
            <div className="media-right my-auto">
                <span
                    className="icon is-clickable has-text-danger is-size-6 mr-4"
                    id={'trash' + index}
                    onClick={() => {
                        shaking('#trash' + index)
                        deleteChat(message.id)
                    }}
                >
                    <i className="fa-solid fa-trash-can"></i>
                </span>
            </div>
        </article>
    ) : (
        <article
            className="media mt-3 mx-auto pb-2 is-align-items-end "
            style={{ maxWidth: '1000px', textAlign: 'end' }}
            key={index}
        >
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{message.creator.user.username}</strong>{' '}
                        <small> {message.timespan}</small>
                        <br />
                        {message.content}
                    </p>
                </div>
            </div>
            <figure className="media-right my-auto pr-2">
                <p className="image">
                    <img
                        src={`https://avatars.dicebear.com/api/${message.creator.user.avatarStyle}/${message.creator.user.username}+${message.creator.user.avatarIteration}.svg`}
                        style={{ height: '50px', width: '50px' }}
                        className="mx-auto"
                        alt="participant avatar"
                    />
                </p>
            </figure>
        </article>
    )
}

export default ChatMessageComponent
