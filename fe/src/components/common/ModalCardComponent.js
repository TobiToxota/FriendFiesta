// package imports
import { createPortal } from 'react-dom'

//local imports
import { useSwipeInFromBottomTwo } from '../../hooks/animations/animations'

const ModalCardComponent = ({ click, showModal, setShowModal, children, title, fetching }) => {
    // animation
    useSwipeInFromBottomTwo(showModal, '#modal')

    if (showModal) {
        return createPortal(
            <div className="overlay modal is-active" id="modal">
                <div className="modal-background" onClick={() => setShowModal(false)} />
                <div className="modal-card px-1">
                    <header className="modal-card-head">
                        <p className="modal-card-title label has-text-centered is-size-5 is-size-6-mobile mb-0">
                            {title}
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => setShowModal(false)}
                        />
                    </header>
                    <div>
                        <section className="modal-card-body">{children}</section>
                        <footer className="modal-card-foot is-justify-content-center is-flex-wrap-wrap">
                            {!fetching ? (
                                <button
                                    className="button is-success mb-1 is-rounded"
                                    onClick={() => {
                                        click()
                                        setShowModal(false)
                                    }}
                                >
                                    Save changes
                                </button>
                            ) : (
                                <button className="button is-success mb-1 is-rounded is-loading">
                                    Save changes
                                </button>
                            )}
                            <button
                                className="button is-danger is-rounded mb-1"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </footer>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => setShowModal(false)}
                />
            </div>,
            document.body
        )
    } else {
        return null
    }
}

export default ModalCardComponent
