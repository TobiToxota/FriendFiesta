// local imports
import { makeDateBeautiful } from '../../../utils/nightOutPlanningUtils'

const EditEntryComponent = ({ token, entry }) => {
    return (
        <form>
            <div className="field">
                <label className="label is-size-5 is-size-6-touch mb-1">Location Name:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                        defaultValue={entry.name}
                        name="name"
                    />
                </div>
            </div>
            <label className="label is-size-5 is-size-6-touch mb-1">Timespan:</label>
            <div className="field has-addons">
                <p className="control">
                    <span className="is-not-clickable button  is-size-7-touch">Start:</span>
                </p>
                <p className="control">
                    <input
                        className="input  is-size-7-touch"
                        type="time"
                        defaultValue={makeDateBeautiful(entry.startTime)}
                        name="startTime"
                    />
                </p>
                <p className="control">
                    <span className="is-not-clickable button is-size-7-touch">End:</span>
                </p>
                <p className="control">
                    <input
                        className="input  is-size-7-touch"
                        type="time"
                        defaultValue={makeDateBeautiful(entry.endTime)}
                        name="endTime"
                    />
                </p>
            </div>
            <div className="field">
                <label className="label is-size-5 is-size-6-touch mb-1">Address:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                        defaultValue={entry.location}
                        name="location"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label is-size-5 is-size-6-touch mb-1">Location Type:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                        defaultValue={entry.locationType}
                        name="locationType"
                    />
                </div>
                <p className="help has-text-primary-dark">
                    Please seperate the location types with a comma as a seperator and without a space. (e.g. restaurant,bar)
                </p>
            </div>
        </form>
    )
}

export default EditEntryComponent
