// local imports
import { useDeleteSuggestion } from '../../../hooks/api/suggestionAPI'
import { shaking } from '../../../hooks/animations/animations'

const DeleteSuggestionComponent = ({ suggestion, token }) => {
    // get the useDeleteSuggestionHook
    const { deleteSuggestion } = useDeleteSuggestion(token, suggestion)
    return (
        <div style={{ transform: 'translateX(19px)' }}>
            <span
                className="icon is-small is-clickable is-pulled-right has-text-danger is-size-6-touch is-size-5"
                id="delete-suggestion-trash"
                onClick={() => {
                    deleteSuggestion()
                    shaking('#delete-suggestion-trash')
                }}
            >
                <i className="fa-solid fa-trash-can"></i>
            </span>
        </div>
    )
}

export default DeleteSuggestionComponent
