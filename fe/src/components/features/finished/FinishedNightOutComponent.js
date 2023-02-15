const FinishedNightOutComponent = ({ nightOut }) => {
    return (
        <div className="container is-fluid active is-rounded" id="suggestion-container">
            <div
                className="notification is-light is-rounded shadow"
                style={{
                    marginTop: '15%',
                    paddingRight: '1.25rem',
                    borderRadius: 15,
                    minHeight: '400px',
                }}
                id="suggestion-container-box"
            ></div>
        </div>
    )
}

export default FinishedNightOutComponent
