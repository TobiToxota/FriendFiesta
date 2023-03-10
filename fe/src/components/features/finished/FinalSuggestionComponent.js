// local imports
import { useSwipeInFromBottom } from '../../../hooks/animations/animations'
import EntryViewHeaderComponent from '../universal/EntryViewHeaderComponent'
import EntryViewComponent from '../universal/EntryViewComponent'

const FinalSuggestionComponent = ({ suggestion, children }) => {
    // animation
    useSwipeInFromBottom(FinalSuggestionComponent, '#suggestion-container')

    return (
        <div className="container is-fluid active is-rounded" id="suggestion-container">
            <div
                className="notification is-light is-rounded shadow"
                style={{
                    marginTop: '20px',
                    paddingRight: '1.25rem',
                    borderRadius: 15,
                    minHeight: 'auto',
                }}
                id="suggestion-container-box"
            >
                <p className="mb-0 heading has-text-centered is-size-4 is-size-5-touch label">
                    Description:
                </p>
                {suggestion.description && (
                    <div className="has-text-centered">
                        <p className="has-text-centered is-size-5 is-size-6-mobile mt-0">
                            {suggestion.description}
                        </p>
                    </div>
                )}
                {!suggestion.description && (
                    <p className="has-text-centered is-size-5 is-size-6-mobile mt-0">
                        The creator of this suggestion hasn't added a description
                    </p>
                )}
                <p className="mb-0 heading has-text-centered is-size-4 is-size-5-touch mt-5 label">
                    Timeline:
                </p>
                <p className="help has-text-centered has-text-primary-dark">
                    🙋 Just click on an entry to get more information, such as the address.
                </p>
                <EntryViewHeaderComponent />
                {suggestion.planEntries.map((entry, index) => (
                    <EntryViewComponent entry={entry} index={index} key={index} />
                ))}
                {children}
            </div>
        </div>
    )
}

export default FinalSuggestionComponent
