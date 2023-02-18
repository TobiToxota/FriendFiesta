const AddToChatComponent = ({ userData }) => {
    return (
        <div className="container">
            <article className="media mx-auto mt-4" style={{ maxWidth: '1000px' }}>
                <figure className="media-left my-auto">
                    <p className="image mx-auto">
                        <img
                            src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                            alt="UserAvatar"
                            style={{ height: '50px', width: '50px' }}
                        />
                    </p>
                    <p className="label is-size-7">{userData.username}</p>
                </figure>
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea
                                className="textarea"
                                id="textarea-chat"
                                placeholder="Add a comment..."
                                defaultValue={''}
                                style={{ minHeight: '80px' }}
                            />
                        </p>
                    </div>
                </div>
                <div className="media-right my-auto ml-1">
                    <button className="button is-rounded is-dark">
                        <span className="icon">
                            <i className="far fa-paper-plane" />
                        </span>
                    </button>
                </div>
            </article>
            <div className="has-text-centered mt-3"></div>
        </div>
    )
}

export default AddToChatComponent
