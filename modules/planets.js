class Planet {
  constructor(owner, x, y) {
    this.x = x;
    this.y = y;
    this.setOwner(owner);  // Neutral

    this.population = 50
    this.radius = 30;
  }

  draw(ctx) {
    ctx.strokeStyle = this.colour;
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = this.colour;
    ctx.font = "16pt BebasNeue-Regular";
    ctx.fillText(this.population, this.x, this.y)
  }

  setOwner(owner) {
    this.owner = owner;
    this.colour = getTeamColour(owner);
  }
}

class Planets extends Collection {
  classType = Planet;
}
