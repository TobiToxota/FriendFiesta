const EntryViewHeaderComponent = ({ suggestion }) => {

    return (
        <>
            {suggestion && (
            <label className="label mb-1 is-size-5 is-size-6-mobile has-text-centered mt-3">
                This is {suggestion.creator.user.username}'s suggestion for this Nightout:
            </label>
            )}
            <div
                className="is-centered columns is-1 is-vcentered is-centered has-text-centered is-multiline mt-1 is-hidden-mobile"
                style={{ marginBottom: '0px' }}
                id={'mx-mobile'}
            >
                <div className="column label is-size-4 is-1" style={{ marginBottom: '0px' }}>
                    #
                </div>
                <div className="column label is-size-5 mb-0 is-5">Location</div>
                <div className="column label is-size-5 mb-0 is-2">Start</div>
                <div className="column label is-size-5 mb-0 is-2">End</div>
            </div>
            <div className="container is-hidden-desktop" style={{ height: '20px' }}></div>
        </>
    )
}

export default EntryViewHeaderComponent
