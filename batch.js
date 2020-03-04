var canvas;
var explosionsOn = true;

$(document).ready(() => {

  document.body.onmousedown = () => { return false; } //so page is unselectable

	// Canvas stuff
	canvas = $("#canvas")[0];
  addListeners(canvas);
	ctx = canvas.getContext("2d");
	w = $("#canvas").width();
	h = $("#canvas").height();

	init();
});

////////////////////////////////
////////	GAME INIT
///////	Runs this code right away, as soon as the page loads.
//////	Use this code to get everything in order before your game starts
//////////////////////////////
function init() {
  game = new GraphicEngine();
  setInterval(() => {
    game.doTurn();
  }, 100);

  setInterval(paint, 0);
}

//////////////////////////////////////////////////////
////////	Main Game Engine
////////////////////////////////////////////////////
function paint() {
  var dTime = 1 / 100;

  game.update(ctx, dTime);
}/////////////////////////////END PAINT/ GAME ENGINE

function removeQueuedItems(particles) {
	return particles.filter(i => !i.toBeRemoved);
}
