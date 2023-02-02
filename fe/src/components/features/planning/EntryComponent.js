// local imports
import { makeDateBeautifull } from "../../../utils/nightOutPlanningUtils"

const EntryComponent = ({ entry, index }) => {
    return (
            <div className="columns is-centered is-vcentered has-text-centered is-centered is-multiline mb-1">
                <div className="column is-1 label pb-0">{index}</div>
                <div className="column is-4 pb-0">{entry.name}</div>
                <div className="column is-1 pb-0">{makeDateBeautifull(entry.startTime)}</div>
                <div className="column is-1 pb-0">{makeDateBeautifull(entry.endTime)}</div>
            </div>
    )
}

export default EntryComponent
