const AddEntryComponent = ({ loadSuggestion, token, nightOut, suggestionData }) => {
    return (
        <>
            <div className="container mt-4 is-hidden-touch">
                <label className="label mb-0 has-text-centered mb-2">
                    Add an entry to your suggestion:
                </label>
                <div className="field has-addons has-addons-centered">
                    <p className="control has-icons-left">
                        <span className="select is-rounded">
                            <select>
                                <option>Google Maps Place</option>
                                <option>Individual Place</option>
                            </select>
                        </span>
                        <span className="icon is-small is-left">
                            <i className="fa-solid fa-location-dot" />
                        </span>
                    </p>
                    <p className="control">
                        <input className="input" type="text" placeholder="Name of Place" />
                    </p>
                    <p className="control">
                        <button className="is-not-clickable button">Start:</button>
                    </p>
                    <p className="control">
                        <input className="input" type="time" placeholder="" />
                    </p>
                    <p className="control">
                        <button className="is-not-clickable button">End:</button>
                    </p>
                    <p className="control">
                        <input className="input" type="time" placeholder="" />
                    </p>

                    <p className="control">
                        <button className="button is-link is-rounded">
                            <span className="icon is-small">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span>Add</span>
                        </button>
                    </p>
                </div>
            </div>

            <div className="container mt-4 is-hidden-desktop">
                <label className="label mb-0 has-text-centered mb-2">
                    Add an entry to your suggestion:
                </label>
                <div className="field has-addons has-addons-centered mb-1">
                    <p className="control has-icons-left">
                        <span className="select is-rounded is-size-7-mobile">
                            <select>
                                <option>Google Maps Place</option>
                                <option>Individual Place</option>
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
                        <input className="input is-size-7-mobile" type="time" placeholder="" />
                    </p>
                    <p className="control">
                        <button className="is-not-clickable button is-size-7-mobile">End:</button>
                    </p>
                    <p className="control">
                        <input
                            className="input is-size-7-mobile is-rounded"
                            type="time"
                            placeholder=""
                        />
                    </p>
                    <p className="control">
                        <button className="button is-link is-rounded is-small">
                            <span className="icon is-small">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span>Add</span>
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default AddEntryComponent
