const EntrysHeaderComponent = () => {
    return (
        <>
            <label className="label mb-1 is-size-5 has-text-centered mt-4">
                Your entrys for your suggestion:
            </label>
                <div className="is-centered columns is-vcentered mb-0 is-centered has-text-centered is-multiline">
                    <div className="column label is-size-4 mb-0 is-1">#</div>
                    <div className="column label is-size-5 mb-0 is-2">Location</div>
                    <div className="column label is-size-5 mb-0 is-2">Start</div>
                    <div className="column label is-size-5 mb-0 is-2">End</div>
                </div>
        </>
    )
}

export default EntrysHeaderComponent
