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
                    <i className="fa-solid fa-xmark fa-xl is-clickable is-pulled-right has-text-danger-dark" onClick={() => setShowModal(false)} id="x" />
                        {children}
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
