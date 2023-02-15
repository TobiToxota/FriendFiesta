const ChangeUserNameModal = ({ oldUserName, newUserName }) => {
    return (
        <div className="has-text-centered">
            <p className="label">
                Are you really sure, that you want to change your username from {oldUserName} to{' '}
                {newUserName}?
            </p>
        </div>
    )
}

export default ChangeUserNameModal
