/** @format */

import NightOutDateComponent from "../components/features/NightOutDateComponent";

/* this function gets a phase as prop and returns the needed collection of components */
const nightOutPhaseReturner = (nightOut, getNightOut, userData, token) => {
  if (nightOut.phase === "datePhase") {
    return (
      <>
        <NightOutDateComponent
          nightOut={nightOut}
          getNightOut={getNightOut}
          userData={userData}
          token={token}
        />
      </>
    );
  } else if (nightOut.phase === "planningPhase") {
    return <></>;
  } else if (nightOut.phase === "votingPhase") {
    return <></>;
  } else if (nightOut.phase === "finished") {
    return <></>;
  }
};

export default nightOutPhaseReturner;
