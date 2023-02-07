// package imports
import { createPortal } from 'react-dom'

//local imports
import { useSwipeInFromBottomTwo } from '../../hooks/animations/animations'

const StandardModalComponent = ({ showModal, setShowModal, children }) => {
    // animation
    useSwipeInFromBottomTwo(showModal, '#modal')

    if (showModal) {
        return createPortal(
            <div className="modal is-active" id="modal">
                <div className="modal-background" onClick={() => setShowModal(false)} />
                <div className="modal-content px-2">
                    <div className="pl-0 box">
                        <i
                            className="fa-solid fa-xmark fa-xl is-clickable is-pulled-right is-size-4 is-size-5-touch"
                            onClick={() => setShowModal(false)}
                            id="x"
                            style={{color: 'red'}}
                        />
                        {children}
                        <div className="has-text-centered">
                            <button
                                className="button is-rounded is-danger"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="icon is-small">
                                    <i className="fa-solid fa-door-open"></i>
                                </span>
                                <span className="is-size-6 is-size-7-touch">Close</span>
                            </button>
                        </div>
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

export default StandardModalComponent
