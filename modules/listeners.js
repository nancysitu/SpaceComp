////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////	MOUSE LISTENER
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////


/////////////////
// Mouse Click
///////////////
canvas.addEventListener('click', (evt) => {


}, false);

canvas.addEventListener ('mouseout', () => {pause = true;}, false);
canvas.addEventListener ('mouseover', () => {pause = false;}, false);

canvas.addEventListener('mousemove', (evt) => {
  var mousePos = getMousePos(canvas, evt);

  mx = mousePos.x;
  my = mousePos.y;

}, false);


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}


///////////////////////////////////
//////////////////////////////////
////////	KEY BOARD INPUT
////////////////////////////////

window.addEventListener('keydown', (evt) => {
  var key = evt.keyCode;

}, false);
