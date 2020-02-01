class SpaceObject {
  basicDraw(colour) {
    const cx = this.rect.centerx();
    const cy = this.rect.centery();

    ctx.strokeStyle = colour;
    ctx.lineWidth = this.LINE_WIDTH;
    ctx.beginPath();

    ctx.moveTo(this.pointList[0].x + cx, this.pointList[0].y + cy);
    for (var point of this.pointList) {
      ctx.lineTo(point.x + cx, point.y + cy);
    }

    ctx.closePath();
    ctx.stroke();
  }

  move(dTime) {
    const MAX_SPEED = 250;
    this.dx = Math.min(this.dx, MAX_SPEED);
    this.dx = Math.max(this.dx, -MAX_SPEED);

    this.dy = Math.min(this.dy, MAX_SPEED);
    this.dy = Math.max(this.dy, -MAX_SPEED);

    this.rect.x += this.dx * dTime;
    this.rect.y += this.dy * dTime;
  }
}

class Ship extends SpaceObject {
  LINE_WIDTH = 3
  SIZE = 10;

  constructor(x, y, owner, destination, destX, destY, pop) {
    super();
    this.rect = new Rect(0, 0, this.SIZE, this.SIZE);
    this.rect.setCenterx(x);
    this.rect.setCentery(y);

    this.rotation = 0;

    const deltaX = destX - x;
    const deltaY = destY - y;

    this.dx = deltaX / 2;
    this.dy = deltaY / 2;
    this.rotation = Math.atan2(this.dy, this.dx);

    this.setOwner(owner);
    this.destination = destination;
    this.population = pop
  }

  draw() {
    // Connecting these points traces out ship
    this.pointList = [];

    for (var angle of [0, 140, 220]) {
      var temp = rotatePoint(0, 0, 0, -this.SIZE,
                   // "angle" is in degrees
                   // this.rotation in radians and clockwise from vertical
                   angle * TAU / 360 + this.rotation + TAU / 4
                   );

      // Flip y coordinates so rotations are done in conventional math form but match screen
      temp.y *= -1;
      this.pointList.push(temp);
    }

    this.basicDraw(this.colour);

    // Draw population
    //console.log(this.colour)
    ctx.fillStyle = this.colour;
    ctx.font = "12pt BebasNeue-Regular";
    ctx.fillText(this.population, this.rect.centerx(),
                 this.rect.centery() - this.SIZE);
  }

  setOwner(owner) {
    // Same as planet
    this.colour = getTeamColour(owner);
    this.owner = owner;
  }
}

class Ships extends Collection {
  classType = Ship;
}
