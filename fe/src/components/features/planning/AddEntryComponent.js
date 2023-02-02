// local imports
import { useAddEntryToSuggestion } from '../../../hooks/api/suggestionAPI'

const AddEntryComponent = ({ loadSuggestion, token, nightOut, suggestionData }) => {
    // get the useAddEntryToSuggestionHook
    const { addEntry, addEntryFetching } = useAddEntryToSuggestion(
        loadSuggestion,
        token,
        nightOut.uuid,
        suggestionData
    )

    return (
        <>
            <div className="container is-hidden-touch" style={{ marginTop: '30px' }}>
                <form onSubmit={(e) => addEntry(e)}>
                    <label className="label mb-0 is-size-5 has-text-centered mb-4">
                        Add an entry to your suggestion:
                    </label>
                    <div className="field has-addons has-addons-centered">
                        <p className="control has-icons-left">
                            <span className="select is-rounded">
                                <select name="formType" defaultValue="Google Maps">
                                    <option key={1} value={'Google Maps'}>
                                        Google Maps Place
                                    </option>
                                    <option key={2} value={'Individual Place'}>
                                        Individual Place
                                    </option>
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                                <i className="fa-solid fa-location-dot" />
                            </span>
                            <span
                                className="help is-primary mt-0 has-text-centered"
                                style={{
                                    height: 'auto !important',
                                    whiteSpace: 'unset',
                                    width: '220px',
                                    transform: 'translateY(-98px)translateX(0px)',
                                    position: 'absolute',
                                }}
                            >
                                Select here if you want to add the place via Google Places or not. A
                                place like your apartment should be an individual place.
                            </span>
                        </p>
                        <p className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Name of Place"
                                name="location"
                            />
                        </p>
                        <p className="control">
                            <button className="is-not-clickable button">Start:</button>
                        </p>
                        <p className="control">
                            <input className="input" type="time" placeholder="" name="startTime" />
                        </p>
                        <p className="control">
                            <button className="is-not-clickable button">End:</button>
                        </p>
                        <p className="control">
                            <input className="input" type="time" placeholder="" name="endTime" />
                        </p>
                        <p className="control">
                            {!addEntryFetching ? (
                                <button className="button is-link is-rounded" type="submit">
                                    <span className="icon is-small">
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                    <span>Add</span>
                                </button>
                            ) : (
                                <button className="button is-link is-rounded is-loading">
                                    <span className="icon is-small">
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                    <span>Add</span>
                                </button>
                            )}
                        </p>
                    </div>
                </form>
            </div>

            <div className="container mt-4 is-hidden-desktop">
                <form onSubmit={(e) => addEntry(e)}>
                    <label className="label mb-0 has-text-centered mb-2">
                        Add an entry to your suggestion:
                    </label>
                    <div className="field has-addons has-addons-centered mb-1">
                        <p className="control has-icons-left">
                            <span className="select is-rounded is-size-7-mobile">
                                <select name="formType" defaultValue="Google Maps">
                                    <option key={1} value={'Google Maps'}>
                                        Google Maps Place
                                    </option>
                                    <option key={2} value={'Individual Place'}>
                                        Individual Place
                                    </option>
                                </select>
                            </span>
                            <span className="icon is-small is-left is-size-7-mobile">
                                <i className="fa-solid fa-location-dot" />
                            </span>
                        </p>
                        <p className="control">
                            <input
                                className="input is-rounded is-size-7-mobile"
                                type="text"
                                placeholder="Name of Place"
                                name="location"
                            />
                        </p>
                    </div>
                    <div className="field has-addons has-addons-centered">
                        <p className="control">
                            <button className="is-not-clickable button is-size-7-mobile is-rounded">
                                Start:
                            </button>
                        </p>
                        <p className="control">
                            <input
                                className="input is-size-7-mobile"
                                type="time"
                                placeholder=""
                                name="startTime"
                            />
                        </p>
                        <p className="control">
                            <button className="is-not-clickable button is-size-7-mobile">
                                End:
                            </button>
                        </p>
                        <p className="control">
                            <input
                                className="input is-size-7-mobile is-rounded"
                                type="time"
                                placeholder=""
                                name="endTime"
                            />
                        </p>
                        <p className="control">
                            <button className="button is-link is-rounded is-small" type="submit">
                                <span className="icon is-small">
                                    <i className="fa-solid fa-plus"></i>
                                </span>
                                <span>Add</span>
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEntryComponent
