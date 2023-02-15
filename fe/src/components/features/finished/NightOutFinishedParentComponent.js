// local imports
import GratulationComoponent from './GratulationComponent'
import ParticlesComponent from './ParticlesComponent'

// package imports
import { useState } from 'react'
import FinishedNightOutComponent from './FinishedNightOutComponent'
import SelectFinalPlanComponent from './SelectFinalPlanComponent'

const NightOutFinishedParentComponent = ({ nightOut, userData }) => {
    // get state for gratulate animation
    const [gratulate, setGratulate] = useState(true)
    setTimeout(() => {
        setGratulate(false)
    }, 3810)
    // get state for the current selected plan
    const [suggestion, setSuggestion] = useState(nightOut.planSuggestions[nightOut.finalFirstSuggestion])

    return (
        <>
            {gratulate && <GratulationComoponent userData={userData} nightOut={nightOut} />}
            {!gratulate && (
                <>

                    <SelectFinalPlanComponent suggestion={suggestion} />
                    <FinishedNightOutComponent nightOut={nightOut} />{' '}
                </>
            )}
            <ParticlesComponent />
        </>
    )
}

export default NightOutFinishedParentComponent
