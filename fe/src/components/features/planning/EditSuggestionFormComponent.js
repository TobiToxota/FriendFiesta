
// local imports
import EditDescriptionComponent from './EditDescriptionComponent'
import EntryComponent from './EntryComponent'
import EntrysHeaderComponent from './EntrysHeaderComponent'
import AddEntryComponent from './AddEntryComponent'
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'

const EditSuggestionFormComponent = ({ loadSuggestion, token, nightOut, suggestionData }) => {
    // animation
    useSwipeInFromBottom(EditSuggestionFormComponent, '#create-suggestion-container')


    return (
        <>
            <div className="container is-fluid active is-rounded" id="create-suggestion-container">
                <div
                    className="notification is-light is-rounded shadow"
                    style={{
                        marginTop: '0px !important',
                        borderRadius: 15,
                        minHeight: '150px',
                    }}
                >
                    <h2 className="label is-size-5 is-size-6-touch has-text-centered mb-2">
                        Edit your Suggestion for {nightOut.title}
                    </h2>
                    <EditDescriptionComponent loadSuggestion={loadSuggestion} token={token} nightOut={nightOut} suggestionData={suggestionData} />
                    <AddEntryComponent loadSuggestion={loadSuggestion} token={token} nightOut={nightOut} suggestionData={suggestionData}/>
                    <EntrysHeaderComponent/>
                    {suggestionData.planEntries.map((entry, index) => (
                        <EntryComponent entry={entry} key={index} index={index}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default EditSuggestionFormComponent
