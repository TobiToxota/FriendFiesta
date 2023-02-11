// local imports
import { buttonPress } from '../../../hooks/animations/animations'
import { swipeAwaytoRight } from '../../../hooks/animations/animations'

const SelectSuggestionComponent = ({
    nightOut,
    incrementSuggestionCounter,
    decrementSuggestionCounter,
    suggestionCounter,
}) => {

    return (
        
        <div className="container is-fluid active is-rounded mb-1" id="suggestion-container">
        <div
            className="notification is-light is-rounded shadow"
            style={{
                marginTop: '0px !important',
                paddingRight: '1.25rem',
                borderTopRightRadius: '15px',
                borderTopLeftRadius: '15px',
                minHeight: 'auto',
            }}
        >
            <div className="columns is-mobile">
                <div className="column p-1 py-0">
                    <button
                        className="button is-rounded is-link is-hidden-mobile"
                        id="decrement-button"
                        onClick={() => {
                            decrementSuggestionCounter()
                            buttonPress('#decrement-button')
                            swipeAwaytoRight('#suggestion-container-box')
                        }}
                    >
                        <span className="icon">
                            <i className="fa-solid fa-left-long"></i>
                        </span>
                        <span className="pb-1">previous suggestion</span>
                    </button>
                    <button
                        className="button is-rounded is-link is-hidden-tablet"
                        id="decrement-button"
                        onClick={() => {
                            decrementSuggestionCounter()
                            buttonPress('#decrement-button')
                            swipeAwaytoRight('#suggestion-container-box')
                        }}
                    >
                        <span className="icon">
                            <i className="fa-solid fa-left-long"></i>
                        </span>
                    </button>
                </div>
                <div className="column p-1 pt-2 has-text-centered">
                    <p className="label is-size-4 is-size-5-touch">
                        <span id="suggestion-number"># {suggestionCounter + 1}</span> /{' '}
                        {nightOut.planSuggestions.length}
                    </p>
                </div>
                <div className="column p-1 py-0">
                    <button
                        className="button is-rounded is-link is-pulled-right is-hidden-mobile"
                        id="increment-button"
                        onClick={() => {
                            incrementSuggestionCounter()
                            buttonPress('#increment-button')
                            swipeAwaytoRight('#suggestion-container-box')
                        }}
                    >
                        <span className="pb-1 is-hidden-mobile">next suggestion</span>
                        <span className="icon">
                            <i className="fa-solid fa-right-long"></i>
                        </span>
                    </button>
                    <button
                        className="button is-rounded is-link is-pulled-right is-hidden-tablet"
                        id="increment-button"
                        onClick={() => {
                            incrementSuggestionCounter()
                            buttonPress('#increment-button')
                            swipeAwaytoRight('#suggestion-container-box')
                        }}
                    >
                        <span className="icon">
                            <i className="fa-solid fa-right-long"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SelectSuggestionComponent
