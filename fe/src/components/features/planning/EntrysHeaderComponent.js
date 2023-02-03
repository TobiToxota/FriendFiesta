const EntrysHeaderComponent = ({ nightOut, suggestionData }) => {
    return (
        <>
            <label className="label mb-1 is-size-5 is-size-6-mobile has-text-centered mt-4">
                Your entrys for your suggestion for {nightOut.title}:
            </label>
            {suggestionData.planEntries.length > 0 ? (
                <>
                    <div
                        className="is-centered columns is-1 is-vcentered is-centered has-text-centered is-multiline mt-1 is-hidden-mobile"
                        style={{ marginBottom: '0px' }}
                        id={'mx-mobile'}
                    >
                        <div
                            className="column label is-size-4 is-1"
                            style={{ marginBottom: '0px' }}
                        >
                            #
                        </div>
                        <div className="column label is-size-5 mb-0 is-6">Location</div>
                        <div className="column label is-size-5 mb-0 is-1">Start</div>
                        <div className="column label is-size-5 mb-0 is-1">End</div>
                        <div className="column label is-size-5 mb-0 is-1">Delete</div>
                    </div>
                    <div className="container is-hidden-desktop" style={{ height: '20px' }}></div>
                </>
            ) : (
                <label className="label mb-1 is-size-6 is-size-7-mobile has-text-centered mt-4">
                😔 You have added no entrys to your suggestion for {nightOut.title}:
            </label>
            )}
        </>
    )
}

export default EntrysHeaderComponent
