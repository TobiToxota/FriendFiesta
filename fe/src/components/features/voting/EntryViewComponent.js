// package imports
import { useState } from 'react'

// local imports
import StandardModalComponent from '../../common/StandardModalComponent'
import EntryDetailsComponent from '../../features/planning/EntryDetailsComponent'
import { makeDateBeautiful } from '../../../utils/nightOutPlanningUtils'

const EntryViewComponent = ({ entry, index }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    return (
        <>
            <div
                className="entry-component columns shadow is-1 is-centered pt-0 has-text-centered is-centered is-multiline mb-1 is-clickable"
                style={{ backgroundColor: '#f1f1f1', borderRadius: '10px' }}
                id="mx-mobile"
                onClick={() => setShowDetailsModal(true)}
            >
                <div className="column is-1 label pb-2 mb-0 is-size-5 is-size-6-touch" id="entry-component">
                    <p className="is-hidden-tablet is-inline"># </p>
                    {index}
                </div>
                <div className="column is-5 label pb-3 mb-0 is-size-5 is-size-6-touch" id="entry-component">
                    {entry.name}
                </div>
                <div className="column is-2 pb-3 is-size-5 is-size-6-touch" id="entry-component">
                    {' '}
                    {makeDateBeautiful(entry.startTime)}
                </div>
                <div className="column is-2 pb-3 is-size-5 is-size-6-touch" id="entry-component">
                    {makeDateBeautiful(entry.endTime)}
                </div>
            </div>
            <div className="is-hidden-tablet pb-2"></div>
            <div className="container" style={{ height: '10px' }}></div>
            <StandardModalComponent
                showModal={showDetailsModal}
                setShowModal={setShowDetailsModal}
                children={<EntryDetailsComponent entry={entry}/>}
            />
        </>
    )
}

export default EntryViewComponent
