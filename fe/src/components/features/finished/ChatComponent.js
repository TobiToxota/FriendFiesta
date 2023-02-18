const ChatComponent = ({ userData, nightOut }) => {
    return (
        <div className="container">
            <p className="mb-0 heading has-text-centered is-size-4 is-size-5-touch mt-3 label">
                Chat:
            </p>
            <article
                className="media mt-3 mx-auto pb-2"
                style={{ maxWidth: '1000px', borderBottom: '1px dotted #959595' }}
            >
                <figure className="media-left my-auto">
                    <p className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare
                            magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa
                            sem. Etiam finibus odio quis feugiat facilisis.
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ChatComponent
