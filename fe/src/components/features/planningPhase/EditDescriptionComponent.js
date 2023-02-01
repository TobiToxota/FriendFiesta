const EditDescriptionComponent = ({suggestionData}) => {
    console.log(suggestionData.description)
    return (
        <div className="field has-text-centered">
            <div className="control has-text-centered">
                <textarea
                    className="textarea is-link mx-auto has-text-centered p-2"
                    id="textarea-description"
                    placeholder={suggestionData.description}
                    defaultValue={suggestionData.description}
                />
            </div>
        </div>
    )
}

export default EditDescriptionComponent
