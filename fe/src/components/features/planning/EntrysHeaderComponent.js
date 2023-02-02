const EntrysHeaderComponent = () => {
    return (
        <>
            <label className="label mb-1 is-size-5 has-text-centered mt-4">
                Your entrys for your suggestion:
            </label>
            <div
                className="is-centered columns is-1 is-vcentered is-centered has-text-centered is-multiline mt-1 is-hidden-mobile"
                style={{ marginBottom: '0px' }}
            >
                <div className="column label is-size-4 is-1" style={{ marginBottom: '0px' }}>
                    #
                </div>
                <div className="column label is-size-5 mb-0 is-6">Location</div>
                <div className="column label is-size-5 mb-0 is-1">Start</div>
                <div className="column label is-size-5 mb-0 is-1">End</div>
                <div className="column label is-size-5 mb-0 is-1">Delete</div>
            </div>
            <div className="container is-hidden-desktop" style={{ height: '20px' }}></div>
        </>
    )
}

export default EntrysHeaderComponent
