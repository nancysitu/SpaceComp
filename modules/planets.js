class Planet {
  LINE_WIDTH = 6

  constructor(owner, x, y, population) {
    const radius = 30;
    this.radius = radius;
    this.rect = new Rect(x - radius / 2, y - radius / 2, radius, radius);

    this.counter = 0;
    this.setOwner(owner);
    this.population = population;
  }

  draw(ctx) {
    ctx.strokeStyle = this.colour;
    ctx.lineWidth = this.LINE_WIDTH;

    ctx.beginPath();
    ctx.arc(...this.rect.center(), this.radius, 0, TAU);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = this.colour;
    ctx.font = "16pt BebasNeue-Regular";
    ctx.fillText(this.population, ...this.rect.center())
  }

  update(dTime) {
    this.counter += dTime / 2;

    while (this.counter > 1) {
      this.population += 1;
      this.counter -= 1;
    }
  }

  setOwner(owner) {
    this.owner = owner;
    this.colour = getTeamColour(owner);
  }
}

class Planets extends Collection {
  classType = Planet;
}
