// local imports
import GratulationComoponent from './GratulationComponent'
import ParticlesComponent from './ParticlesComponent'

// package imports
import { useState } from 'react'
import FinishedNightOutComponent from './FinishedNightOutComponent'
import FinalNightOutTopComponent from './FinalNightOutTopComponent'

const NightOutFinishedParentComponent = ({ nightOut, userData }) => {
    // get state for gratulate animation
    const [gratulate, setGratulate] = useState(true)
    setTimeout(() => {
        setGratulate(false)
    }, 3810)
    
    // state if there are two suggestions with same votes
    const [suggestion, setSuggestion] = useState()

    return (
        <>
            {gratulate && <GratulationComoponent userData={userData} nightOut={nightOut} />}
            {!gratulate && (
                <>
                    <FinalNightOutTopComponent
                        suggestion={nightOut.planSuggestions[0]}
                        nightOut={nightOut}
                    />
                    <FinishedNightOutComponent nightOut={nightOut} />{' '}
                </>
            )}
            <ParticlesComponent />
        </>
    )
}

export default NightOutFinishedParentComponent
