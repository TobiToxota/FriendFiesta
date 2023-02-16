// local imports
import GratulationComoponent from './GratulationComponent'
import ParticlesComponent from './ParticlesComponent'
import FinishedNightOutComponent from './FinishedNightOutComponent'
import FinalNightOutTopComponent from './FinalNightOutTopComponent'
import { useFinalSuggestionsCounter } from '../../../hooks/utilHooks/FinalSuggestionsCounterHook'

// package imports
import { useState } from 'react'

const NightOutFinishedParentComponent = ({ nightOut, userData }) => {
    // get state for gratulate animation
    const [gratulate, setGratulate] = useState(true)
    setTimeout(() => {
        setGratulate(false)
    }, 3810)
    // get useTwoFinalSuggestions Hook
    const {suggestionCounter, switchCounter} = useFinalSuggestionsCounter(nightOut)

    return (
        <>
            {gratulate && <GratulationComoponent userData={userData} nightOut={nightOut} />}
            {!gratulate && (
                <>
                    <FinalNightOutTopComponent
                        suggestion={nightOut.planSuggestions[suggestionCounter]} changeSuggestion={switchCounter}
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
