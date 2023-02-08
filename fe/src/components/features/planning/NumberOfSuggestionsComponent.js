// local imports
import { countPeopleFinished } from '../../../utils/nightOutPlanningUtils'

const NumberOfSuggestionsComponent = ({ nightOut }) => {
    return (
        <div className="has-text-centered mt-2" style={{ transform: 'translateY(-3px)' }}>
            <p className="label is-size-6 is-size-6-mobile mb-0">
                {nightOut.planSuggestions.length} of {nightOut.participants.length} participants
                have created a suggestion so far.
            </p>
            <p className="label is-size-6 is-size-6-mobile mt-0 mb-0">
                {countPeopleFinished(nightOut)} of {nightOut.participants.length} particpants have
                declared that they are done with this phase.
            </p>

            <p className="is-size-6">
                {nightOut.planSuggestions.length === 0 && (
                    <>
                        Nobody has submitted a suggestion...
                        <br />
                        Go and create one 🚀
                    </>
                )}
            </p>
        </div>
    )
}

export default NumberOfSuggestionsComponent
