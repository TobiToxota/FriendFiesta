const AddToChatComponent = ({ userData }) => {
    return (
        <div className="container">
            <p className="mb-0 heading has-text-centered is-size-4 is-size-5-touch mt-3 label">
                Chat:
            </p>
            <article className="media mx-auto mt-4" style={{ maxWidth: '1000px' }}>
                <figure className="media-left my-auto">
                    <p className="image mx-auto">
                        <img
                            src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                            alt="UserAvatar"
                            style={{height: '50px', width: '50px'}}
                        />
                    </p>
                    <p className="label is-size-7">{userData.username}</p>
                </figure>
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea
                                className="textarea"
                                id='textarea-chat'
                                placeholder="Add a comment..."
                                defaultValue={''}
                                style={{minHeight: '80px'}}
                            />
                        </p>
                    </div>
                </div>
            </article>
            <div className="has-text-centered mt-3">
                <button className="button is-rounded is-link">Add</button>
            </div>
        </div>
    )
}

export default AddToChatComponent
