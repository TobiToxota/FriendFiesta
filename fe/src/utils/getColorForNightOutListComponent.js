/** @format */

function getColorForNightOutListComponent(nightOut) {
  if (nightOut.phase === "finished") {
    return "#00c4a7";
  }
  if (nightOut.phase === "datePhase") {
    return "#19FFDD";
  }
  if (nightOut.phase === "planningPhase") {
    return "#FFFCD1";
  }
  if (nightOut.phase === "votingPhase") {
    return "#F0BD46";
  } else {
    return "white";
  }
}

export default getColorForNightOutListComponent;
