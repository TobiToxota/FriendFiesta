// local imports
import EditDescriptionComponent from './EditDescriptionComponent'
import EntryComponent from './EntryComponent'
import DeleteSuggestionComponent from './DeleteSuggestionComponent'
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
                    <DeleteSuggestionComponent
                        suggestion={suggestionData}
                        token={token}
                        loadSuggestion={loadSuggestion}
                    />
                    <h2 className="label is-size-4 is-size-5-touch has-text-centered mb-2">
                        Edit your Suggestion for {nightOut.title}
                    </h2>
                    <EditDescriptionComponent
                        loadSuggestion={loadSuggestion}
                        token={token}
                        nightOut={nightOut}
                        suggestionData={suggestionData}
                    />

                    <EntrysHeaderComponent nightOut={nightOut} suggestionData={suggestionData} />
                    {suggestionData.planEntries.map((entry, index) => (
                        <EntryComponent
                            entry={entry}
                            key={index}
                            loadSuggestion={loadSuggestion}
                            index={index}
                            token={token}
                        />
                    ))}
                    <AddEntryComponent
                        loadSuggestion={loadSuggestion}
                        token={token}
                        nightOut={nightOut}
                        suggestionData={suggestionData}
                    />
                </div>
            </div>
        </>
    )
}

export default EditSuggestionFormComponent
