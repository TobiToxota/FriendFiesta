// local imports
import { makeDateBeautifull } from '../../../utils/nightOutPlanningUtils'

const EntryComponent = ({ entry, index }) => {
    return (
        <>
            <div className="entry-component columns shadow  is-1 is-centered pt-0 has-text-centered is-centered is-multiline mb-1 is-clickable"
            style={{backgroundColor: '#f1f1f1', borderRadius: '10px'}}
            id='mx-mobile'>
                <div className="column is-1 label pb-0">{index}</div>
                <div className="column is-6 label pb-0">{entry.name}</div>
                <div className="column is-1 pb-0">{makeDateBeautifull(entry.startTime)}</div>
                <div className="column is-1 pb-0">{makeDateBeautifull(entry.endTime)}</div>
                <div className="column is-1 pb-0">
                    <span className="icon has-text-info is-clickable">
                        <i className="fa-regular fa-trash-can has-text-danger"></i>
                    </span>
                </div>
            </div>
            <div className="container" style={{ height: '10px' }}></div>
            <div className="container is-hidden-tablet" style={{ height: '20px' }}></div>
        </>
    )
}

export default EntryComponent
