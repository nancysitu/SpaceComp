class Planet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.setOwner(0);  // Neutral

    this.radius = 30;
  }

  draw(ctx) {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.fill();
  }

  setOwner(owner) {
    this.owner = owner;
    this.colour = getTeamColour(owner);
  }
}

class Planets extends Collection {
  classType = Planet;
}
