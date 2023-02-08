// local imports
import StandardModalComponent from '../../common/StandardModalComponent'
import { countPeopleFinished } from '../../../utils/nightOutPlanningUtils'

// package imports
import { useState } from 'react'

const PutNightOutToNextPhaseComponent = ({ nightOut, refreshNightOut, token }) => {
    const [showModal, setShowModal] = useState(false)

    const ModalContent = (
        <div className=" content has-text-centered mb-2">
            <h3>Bring Nightout to next phase</h3>
            <h4 className='mb-2'>Are you really sure that you want to bring this Nightout to the voting phase?</h4>
            <h5 className='mb-2'>
                {nightOut.planSuggestions.length} of {nightOut.participants.length} participants
                have created a suggestion so far.
            </h5>
            <h5 className='mb-2'>
                {countPeopleFinished(nightOut)} of {nightOut.participants.length} particpants have
                declared that they are done with this phase.
            </h5>
            <p className='mx-6'>
                When you put the Nightout into the voting phase, nobody can create or edit
                suggestions anymore. The participants are allowed to view all suggestions and are
                allowed to vote on ones favorite suggestion.
            </p>
            <button
                className="button is-primary is-rounded mt-2"
            >
                <span className="icon is-small">
                    <i className="fa-solid fa-forward-step"></i>
                </span>
                <span className="">Yes! I'm sure!</span>
            </button>
        </div>
    )

    return (
        <>
            <button
                className="button is-link is-rounded is-size-6 is-size-7-touch mt-2"
                onClick={() => setShowModal(true)}
            >
                <span className="icon is-small">
                    <i className="fa-solid fa-forward-step"></i>
                </span>
                <span className="is-is-size-7-touch">Bring Nightout to next phase</span>
            </button>
            <StandardModalComponent
                showModal={showModal}
                setShowModal={setShowModal}
                children={ModalContent}
            />
        </>
    )
}

export default PutNightOutToNextPhaseComponent
