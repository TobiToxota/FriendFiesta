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
                    <p class="control">
                        <div class="button">Start:</div>
                    </p>
                    <p className="control">
                        <input className="input" type="time" placeholder="" />
                    </p>
                    <p class="control">
                        <div class="button">End:</div>
                    </p>
                    <p className="control">
                        <input className="input" type="time" placeholder="" />
                    </p>

                    <p className="control">
                        <div className="button is-link is-rounded">
                            <span className="icon is-small">
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span>Add</span>
                        </div>
                    </p>
                </div>
            </div>

            <div className="container mt-4 is-hidden-desktop">
                <label className="label mb-0 has-text-centered mb-2">
                    Add an entry to your suggestion:
                </label>
                <div className="field has-addons has-addons-centered">
                    <p className="control has-icons-left">
                        <span className="select is-rounded is-size-7-touch">
                            <select>
                                <option>Google Maps Place</option>
                                <option>Individual Place</option>
                            </select>
                        </span>
                        <span className="icon is-small is-left is-size-7-touch">
                            <i className="fa-solid fa-location-dot" />
                        </span>
                    </p>
                    <p className="control">
                        <input
                            className="input is-rounded is-size-7-touch"
                            type="text"
                            placeholder="Name of Place"
                        />
                    </p>
                </div>
                <div className="field has-addons has-addons-centered">
                <p class="control">
                        <div class="button is-size-7">Start:</div>
                    </p>
                    <p className="control">
                        <input className="input is-size-7-touch" type="time" placeholder="" />
                    </p>
                    <p class="control">
                        <div class="button is-size-7-touch">End:</div>
                    </p>
                    <p className="control">
                        <input className="input is-size-7-touch" type="time" placeholder="" />
                    </p>
                </div>
            </div>
        </>
    )
}

export default AddEntryComponent
