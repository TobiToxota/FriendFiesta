const NextPhaseComponent = ({ nightOut, token, refreshNightOut }) => {
    return (
        <div className="container is-fluid active is-rounded">
            <div
                className="notification is-light is-rounded shadow"
                style={{
                    marginTop: '0px !important',
                    paddingRight: '1.25rem',
                    borderBottomRightRadius: '15px',
                    borderBottomLeftRadius: '15px',
                    minHeight: 'auto',
                }}
            ></div>
        </div>
    )
}

export default NextPhaseComponent
