// package imports
import { useState } from 'react'

// local imports
import StandardModalComponent from '../../common/StandardModalComponent'

const NextPhaseComponent = ({ nightOut, token, refreshNightOut, userData }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="container has-text-centered mt-3" style={{ maxWidth: '800px' }}>
            {userData.id === nightOut.creator.id && (
                <>
                    <p className="label is-size-6 is-size-7-mobile mt-1 mb-1">
                        You are the creator of this Nightout. The voting phase will be automatically
                        stopped if everyone voted. You also have the option to end the voting phase
                        early.
                    </p>
                    <button
                        className="button is-link is-rounded"
                        onClick={() => setShowModal(true)}
                    >
                        <span className="icon">
                            <i className="fas fa-flag-checkered" />
                        </span>
                        <span>End voting</span>
                    </button>
                    <StandardModalComponent showModal={showModal} setShowModal={setShowModal} />
                </>
            )}
        </div>
    )
}

export default NextPhaseComponent
