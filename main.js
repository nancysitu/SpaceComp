$(document).ready(() => {

  document.body.onmousedown = () => { return false; } //so page is unselectable

	// Canvas stuff
	canvas = $("#canvas")[0];
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
  game = new Game();
  game.planets.add(200, 200);
  game.planets.add(400, 400);

  console.log(game.planets);

  start = null;
	requestAnimationFrame(paint);
}

//////////////////////////////////////////////////////
////////	Main Game Engine
////////////////////////////////////////////////////
function paint(timestamp) {
  if (!start) start = timestamp;  // First frame
  var dTime = (timestamp - start) / 1000;

	ctx.fillStyle = 'black'
	ctx.fillRect(0,0,w,h);
  game.draw(ctx);

  start = timestamp;
  requestAnimationFrame(paint);
}/////////////////////////////END PAINT/ GAME ENGINE
