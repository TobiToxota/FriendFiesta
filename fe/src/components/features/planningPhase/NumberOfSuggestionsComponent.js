// local imports
import DropDownContentComponent from '../../common/DropDownContentComponent'

const NumberOfSuggestionsComponent = ({ nightOut }) => {
    return (
        <div className="ml-1">
            <DropDownContentComponent
                content={
                    <ul
                        className="is-inline is-size-6-desktop"
                        style={{ listStyle: 'none' }}
                    >
                        {nightOut.planSuggestions.map((suggestion) => (
                            <li key={suggestion.id}>
                                {suggestion.creator.username}
                            </li>
                        ))}
                        {nightOut.planSuggestions.length === 0 && (
                            <>
                                Nobody has submitted a suggestion, so far. Be
                                the first one and create one.
                            </>
                        )}
                    </ul>
                }
                title={nightOut.planSuggestions.length + ' suggestions'}
                icon={'fa-solid fa-hashtag'}
            />
        </div>
    )
}

export default NumberOfSuggestionsComponent
