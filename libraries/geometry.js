function drawSphere(rect, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  // Radius is slightly smaller than collision rect
  const radius = (rect.width + rect.height) / 2 - 1;
  ctx.arc(rect.centerx(), rect.centery(), radius, 0, TAU);
  ctx.fill();
}

// http://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
function rotatePoint(originX, originY, pointX, pointY, angle) {
	var COS = Math.cos(angle);
	var SIN = Math.sin(angle);

	return {x: COS * (pointX - originX) - SIN * (pointY - originY) + originX,
				  y: SIN * (pointX - originX) - COS * (pointY - originY) + originY};
}

function inCircle(rect, pointX, pointY) {
  const dx = rect.centerx() - pointX;
  const dy = rect.centery() - pointY;
  const radius = (rect.width + rect.height) / 2 - 1;

  return dx**2 + dy**2 < radius**2;
}
