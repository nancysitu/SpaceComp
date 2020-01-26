const COLOURS = {
  0: "grey",
  1: "red",
  2: "blue"
}

function getTeamColour(id) {
  if (id in COLOURS) {
    return COLOURS[id];
  } else {
    console.error(`Unexpected id ${id}`)
  }
}
