/** @format */

/* this function gets a nightout and returns a certain color for coloring the nightout in the nightoutlistpage */
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

/* this function gets a nightout and returns a certain text for the nightout in the nightoutlistpage */
function getPhaseForNightOutListComponent(nightOut) {
  if (nightOut.phase === "finished") {
    return "This NightOut is finished";
  } else if (nightOut.phase === "votingPhase") {
    return "This NightOut is in the voting phase";
  } else if (nightOut.phase === "planningPhase") {
    return "This NightOut is in the planning phase";
  } else {
    return "This nightOut is in the data phase";
  }
}

export {getColorForNightOutListComponent, getPhaseForNightOutListComponent};
