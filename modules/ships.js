class Ship {
  constructor(x, y, owner, destination) {
    this.x = x;
    this.y = y;
    this.setOwner(owner);

    this.destination = destination;
    this.population = 50
  }

  draw(ctx) {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, TAU);
    ctx.fill();
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
