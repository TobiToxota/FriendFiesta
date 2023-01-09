import NightOutTopDateComponent from "../components/features/NightOutTopComponent";

/* this function gets a phase as prop and returns the needed collection of components */
const nightOutPhaseReturner = (nightOut, userData, token) => {
    if (nightOut.phase === "datePhase") {
      return (
        <>
          <NightOutTopDateComponent
            nightOut={nightOut}
            userData={userData}
            token={token}
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