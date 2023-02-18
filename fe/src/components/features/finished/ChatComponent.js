const ChatComponent = ({ userData, nightOut }) => {
    return (
        <div className="container">
            <p className="mb-0 heading has-text-centered is-size-4 is-size-5-touch mt-3 label">
                Chat:
            </p>
            {nightOut.postsOnNightout.map((post, index) =>
                post.creator.user.username === userData.username ? (
                    <article
                        className="media mt-3 mx-auto pb-2"
                        style={{ maxWidth: '1000px' }}
                        key={index}
                    >
                        <figure className="media-left my-auto">
                            <p className="image">
                                <img
                                    src={`https://avatars.dicebear.com/api/${post.creator.user.avatarStyle}/${post.creator.user.username}+${post.creator.user.avatarIteration}.svg`}
                                    style={{ height: '50px', width: '50px' }}
                                    className="mx-auto"
                                    alt="participant avatar"
                                />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{post.creator.user.username}</strong>{' '}
                                    <small> {post.timespan}</small>
                                    <br />
                                    {post.content}
                                </p>
                            </div>
                        </div>
                        <div className="media-right my-auto">
                            <span className="icon is-clickable has-text-danger is-size-6 mr-4">
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
                                    <strong>{post.creator.user.username}</strong>{' '}
                                    <small> {post.timespan}</small>
                                    <br />
                                    {post.content}
                                </p>
                            </div>
                        </div>
                        <figure className="media-right my-auto pr-2">
                            <p className="image">
                                <img
                                    src={`https://avatars.dicebear.com/api/${post.creator.user.avatarStyle}/${post.creator.user.username}+${post.creator.user.avatarIteration}.svg`}
                                    style={{ height: '50px', width: '50px' }}
                                    className="mx-auto"
                                    alt="participant avatar"
                                />
                            </p>
                        </figure>
                    </article>
                )
            )}
        </div>
    )
}

export default ChatComponent
