// local imports
import { useDeleteSuggestion } from '../../../hooks/api/suggestionAPI'

const DeleteSuggestionComponent = ({ suggestion, token }) => {
    // get the useDeleteSuggestionHook
    const { deleteSuggestion, deleteSuggestionFetching } = useDeleteSuggestion(token, suggestion)
    return (
        <>
        <div className="container is-hidden-mobile" style={{ height: '25px', position: 'absolute'}}>
            {!deleteSuggestionFetching ? (
                <button
                    className="button is-danger is-rounded ml-1 is-small mt- is-clickable is-pulled-right "
                    onClick={() => deleteSuggestion()}
                    style={{ float: 'right' }}
                >
                    <span className="icon is-small">
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
                </button>
            ) : (
                <button className="button is-danger is-rounded ml-1 is-small is-pulled-right mt-0 is-loading">
                    <span className="icon is-small">
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
                </button>
            )}
        </div>
        <div className="is-hidden-tablet" style={{ height: '25px', transform: 'translateX(19px)'}}>
            {!deleteSuggestionFetching ? (
                    <span className="icon is-small is-clickable is-pulled-right has-text-danger" 
                    onClick={() => deleteSuggestion()}>
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
            ) : (
                <span className="icon is-small is-clickable is-pulled-right has-text-danger is-loading" 
                    onClick={() => deleteSuggestion()}>
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
            )}
        </div>
        </>
    )
}

export default DeleteSuggestionComponent
