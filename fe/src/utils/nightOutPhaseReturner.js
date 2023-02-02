/** @format */

// local imports
import NightOutDateParentComponent from '../components/features/datefinder/NightOutDateParentComponent'
import NightOutPlanningParentComponent from '../components/features/planning/NightOutPlanningParentComponent'

/* this function gets a phase as prop and returns the needed collection of components */
const nightOutPhaseReturner = (nightOut, refreshNightOut, userData, token) => {
    if (nightOut.phase === 'datePhase') {
        return (
            <>
                <NightOutDateParentComponent
                    nightOut={nightOut}
                    refreshNightOut={refreshNightOut}
                    userData={userData}
                    token={token}
                />
            </>
        )
    } else if (nightOut.phase === 'planningPhase') {
        return (
            <>
                <NightOutPlanningParentComponent
                    nightOut={nightOut}
                    refreshNightOut={refreshNightOut}
                    userData={userData}
                    token={token}
                />
            </>
        )
    } else if (nightOut.phase === 'votingPhase') {
        return <></>
    } else if (nightOut.phase === 'finished') {
        return <></>
    }
}

export default nightOutPhaseReturner
