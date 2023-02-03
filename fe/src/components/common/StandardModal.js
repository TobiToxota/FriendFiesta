// package imports
import { createPortal } from 'react-dom'

//local imports
import { useSwipeInFromBottomTwo } from '../../hooks/animations/animations'

const StandardModal = ({ showModal, setShowModal, children }) => {
    // animation
    useSwipeInFromBottomTwo(showModal, '#modal')

    if (showModal) {
        return (
            <div className="modal" id='#modal'>
                <div className="modal-background" />
                <div className="modal-content">
                    {children}
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setShowModal(false)} />
            </div>
        )
    } else {
        return null
    }
}

export default StandardModal
