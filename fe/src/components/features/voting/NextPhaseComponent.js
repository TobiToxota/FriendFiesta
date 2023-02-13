// package imports
import { useState } from 'react'
import SendReminderComponent from '../universal/SendReminderComponent'
import { useFinishNightout } from '../../../hooks/api/votingAPI'

// local imports
import StandardModalComponent from '../../common/StandardModalComponent'

const NextPhaseComponent = ({ nightOut, token, refreshNightOut, userData }) => {
    const [showModal, setShowModal] = useState(false)

    const { finishNightout, finishNightoutFetching } = useFinishNightout(token, nightOut, refreshNightOut)

    const nextPhasModal = ( 
        <div className='content has-text-centered mb-2'>
            <h3>End voting</h3>
            <h4 className="mb-2">
                Are you really sure that you want to end the voting Phase and want to finish this Nightout?
            </h4>
            <p className="mx-6">
                {nightOut.numberOfVotes} of {nightOut.participants.length} participants have
                    voted and {nightOut.numberOfAbstentions} of {nightOut.participants.length} participants indicated that they will abstain.<br/>
                    Accordingly, {nightOut.numberOfVotes + nightOut.numberOfAbstentions} participants have already completed this phase.
            </p>
            {!finishNightoutFetching ? (
                <button
                    className="button is-primary is-rounded mt-2"
                    onClick={() => finishNightout()}
                >
                    <span className="icon is-small">
                        <i className="fa-solid fa-forward-step"></i>
                    </span>
                    <span className="">Yes! I'm sure!</span>
                </button>
            ) : (
                <button className="button is-primary is-rounded mt-2 is-loading">
                    <span className="icon is-small">
                        <i className="fa-solid fa-forward-step"></i>
                    </span>
                    <span className="">Yes! I'm sure!</span>
                </button>
            )}
        </div>
    )

    return (
        <div className="container has-text-centered mt-2" style={{ maxWidth: '800px' }}>
            {userData.id === nightOut.creator.id ? (
                <>
                    <p className="label is-size-6 is-size-7-mobile mt-1 mb-1">
                        You are the creator of this Nightout. The voting phase will be automatically
                        stopped if everyone voted. You also have the option to end the voting phase
                        early.
                    </p>
                    <button
                        className="button is-link is-rounded is-size-7-touch"
                        onClick={() => setShowModal(true)}
                    >
                        <span className="icon">
                            <i className="fas fa-flag-checkered" />
                        </span>
                        <span>End voting</span>
                    </button>
                    <StandardModalComponent showModal={showModal} setShowModal={setShowModal} children={nextPhasModal} />
                </>
            ) : (
                <>
                <p className="label is-size-6 is-size-7-mobile mt-1 mb-1">
                Only the creator of the nightout can end the voting phase early. If you think that he should end the voting phase earlier, you can send him a reminder.
                </p>
                <SendReminderComponent token={token} nightOut={nightOut}/>
            </>
            )}
        </div>
    )
}

export default NextPhaseComponent
