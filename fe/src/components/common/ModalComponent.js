// package imports
import { useState } from 'react'

//local imports
import { useSwipeInFromBottomTwo } from '../../hooks/animations/animations'

const ModalComponent = ({ showModal, setShowModal, children, title }) => {
    // animation
    useSwipeInFromBottomTwo(showModal, '#modal')

    if (showModal) {
        return (
            <div className="modal is-active" id='modal'>
                <div className="modal-background" onClick={() => setShowModal(false)} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title label has-text-centered is-size-5 is-size-6-mobile mb-0">{title}</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => setShowModal(false)}
                        />
                    </header>
                    <div>
                        <section className="modal-card-body">
                            {children}
                        </section>
                        <footer className="modal-card-foot is-justify-content-center is-flex-wrap-wrap">
                            <button className="button is-success mb-1 is-rounded">
                                Save changes
                            </button>
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
            </div>
        )
    } else {
        return null
    }
}

export default ModalComponent
