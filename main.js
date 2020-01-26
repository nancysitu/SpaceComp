$(document).ready(() => {

  document.body.onmousedown = () => { return false; } //so page is unselectable

	// Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;

  var planets;

	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts
	//////////////////////////////
	/////////////////////////////
	function init() {
  	//////////
  	///STATE VARIABLES
    planets = new Planets();
    planets.add(200, 200);
    planets.add(400, 400);

  	requestAnimationFrame(paint);
  }

  var start = null;
	init();


	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint(timestamp) {
    if (!start) start = timestamp;
    var dTime = (timestamp - start) / 1000;

		ctx.fillStyle = 'black'
		ctx.fillRect(0,0,w,h);
    planets.draw(ctx);

    start = timestamp;
    requestAnimationFrame(paint);
	}///////////////////////////////////////////////END PAINT/ GAME ENGINE
});
