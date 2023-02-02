const EntryComponent = ({ entry, index }) => {
    return (
            <div className="columns is-centered is-vcentered has-text-centered is-centered is-multiline mb-1">
                <div className="column is-1 label pb-0">{index}</div>
                <div className="column is-3 pb-0">{entry.name}</div>
                <div className="column is-1 pb-0">{entry.startTime}</div>
                <div className="column is-1 pb-0">{entry.endTime}</div>
            </div>
    )
}

export default EntryComponent
