// local imports
import { usePutSuggestion } from "../../../hooks/api/suggestionAPI"

const EditDescriptionComponent = ({suggestionData, loadSuggestion, token, uuid, setDescription}) => {
    const {putSuggestion, putSuggestionLoading} = usePutSuggestion(loadSuggestion, token, uuid, suggestionData)

    const handleChange = (e) => {
        setDescription(e.target.value)
    }
 
    return (
        <div className="field has-text-centered">
            <div className="control has-text-centered">
                <textarea
                    className="textarea is-link mx-auto has-text-centered p-2"
                    id="textarea-description"
                    autoFocus
                    placeholder={suggestionData.description}
                    defaultValue={suggestionData.description}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default EditDescriptionComponent
