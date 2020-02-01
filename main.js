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
  game = new Game();
  game.planets.add(0, 200, 200, 100);
  game.planets.add(1, 400, 200, 20);
  game.planets.add(2, 400, 400, 100);

  // Example game
  setTimeout(() => {
    game.shoot(0, 1, 50);
  }, 2000)

  setTimeout(() => {
    game.shoot(2, 0, 90);
  }, 5000)

  setTimeout(() => {
    game.shoot(1, 2, 20);
  }, 8000)

  setTimeout(() => {
    game.shoot(0, 1, 20);
    game.shoot(0, 2, 15);
  }, 12000)

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
  game.draw(ctx, dTime);
  game.update(dTime);

  start = timestamp;
  requestAnimationFrame(paint);
}/////////////////////////////END PAINT/ GAME ENGINE

function removeQueuedItems(particles) {
	return particles.filter(i => !i.toBeRemoved);
}
