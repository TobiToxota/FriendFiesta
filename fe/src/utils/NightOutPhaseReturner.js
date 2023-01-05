
/* this function gets a phase as prop and returns the needed collection of components */
const nightOutPhaseReturner = (phase) => {
    if (phase === "datePhase") {
      return (
        <>
          <NightOutComponent
            nightOut={thisNightOut}
            refreshNightOut={getNightOutData}
          />
        </>
      );
    } else if (phase === "planningPhase") {
      return (
        <>
        </>
      );
    } else if (phase === "votingPhase") {
      return (
        <>
        </>
      );
    } else if (phase === "finished") {
      return <></>;
    }
  };

  export default nightOutPhaseReturner;