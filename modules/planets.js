const TAU = 2 * Math.PI;

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

    if (owner == 0) {
      this.colour = "grey";
    }
  }
}

class Planets {
  constructor() {
    this.planets = [];
  }

  add(x, y) {
    this.planets.push(new Planet(x, y));
  }

  draw(ctx) {
    for (var planet of this.planets) {
      planet.draw(ctx);
    }
  }
}
