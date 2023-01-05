import NightOutTopComponent from "../components/features/NightOutTopComponent";

/* this function gets a phase as prop and returns the needed collection of components */
const nightOutPhaseReturner = (nightOut, refreshNightOut) => {
    if (nightOut.phase === "datePhase") {
      return (
        <>
          <NightOutTopComponent
            nightOut={nightOut}
            refreshNightOut={refreshNightOut}
          />
        </>
      );
    } else if (nightOut.phase === "planningPhase") {
      return (
        <>
        </>
      );
    } else if (nightOut.phase === "votingPhase") {
      return (
        <>
        </>
      );
    } else if (nightOut.phase === "finished") {
      return <></>;
    }
  };

  export default nightOutPhaseReturner;