// package imports
import { useState } from 'react'

// local imports
import { makeDateBeautiful } from '../../../utils/nightOutPlanningUtils'
import { useDeleteEntryFromSuggestion } from '../../../hooks/api/suggestionAPI'
import { shaking } from '../../../hooks/animations/animations'
import StandardModalComponent from '../../common/StandardModalComponent'
import EntryDetailsComponent from './EntryDetailsComponentl'

const EntryComponent = ({ entry, index, token, loadSuggestion }) => {
    const [showModal, setShowModal] = useState(false)

    // get the useDeleteEntryfromSuggestionhook
    const { deleteEntryFromSuggestion } = useDeleteEntryFromSuggestion(loadSuggestion, token)

    return (
        <>
            <div
                className="entry-component columns shadow is-1 is-centered pt-0 has-text-centered is-centered is-multiline mb-1 is-clickable"
                style={{ backgroundColor: '#f1f1f1', borderRadius: '10px' }}
                id="mx-mobile"
                onClick={() => setShowModal(true)}
            >
                <div className="column is-1 label pb-2 mb-0 is-size-5" id='entry-component'>
                    <p className="is-hidden-tablet is-inline"># </p>
                    {index}
                </div>
                <div className="column is-5 label pb-3 mb-0 is-size-5" id='entry-component'>{entry.name}</div>
                <div className="column is-1 pb-3 is-size-5" id='entry-component'> {makeDateBeautiful(entry.startTime)}</div>
                <div className="column is-1 pb-3 is-size-5" id='entry-component'>{makeDateBeautiful(entry.endTime)}</div>
                <div className="column is-1 pb-3 is-size-6" id='entry-component'>
                    Edit
                </div>
                <div className="column is-1 pb-3 is-size-6" id='entry-component'>
                    <span
                        className="icon has-text-info is-clickable"
                        onClick={(event) => {
                            event.stopPropagation()
                            shaking('#trash')
                            deleteEntryFromSuggestion(entry.id)
                        }}
                    >
                        <i className="fa-regular fa-trash-can has-text-danger" id="trash"></i>
                    </span>
                </div>
                <div className='is-hidden-tablet pb-2'></div>
            </div>
            <StandardModalComponent
                showModal={showModal}
                setShowModal={setShowModal}
                children={<EntryDetailsComponent entry={entry} token={token} />}
            />
            <div className="container" style={{ height: '10px' }}></div>
            <div className="container is-hidden-tablet" style={{ height: '20px' }}></div>
        </>
    )
}

export default EntryComponent
