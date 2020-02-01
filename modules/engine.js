class Game {
  constructor() {
    this.explosions = new Explosions();
    this.planets = new Planets();
    this.ships = new Ships();
  }

  draw(ctx, dTime) {
    this.planets.draw(ctx);
    this.ships.draw(ctx);
    this.explosions.draw(dTime);
  }

  // Takes planet ids
  shoot(source_pid, target_pid, count) {
    if (source_pid == target_pid) return;

    const source = this.planets.find(source_pid);
    const dest = this.planets.find(target_pid);

    const pop = Math.min(source.population, count);
    source.population -= pop;

    const srcPos = source.rect.center();
    const destPos = dest.rect.center();

    const owner = source.owner;

    this.ships.add(...srcPos, owner, target_pid, ...destPos, pop);
  }

  update(dTime) {
    for (var id of Object.keys(this.ships.all)) {
      this.ships.all[id].move(dTime);
      this.collide(id);
    }

    for (var id of Object.keys(this.planets.all)) {
      this.planets.all[id].update(dTime);
    }
  }

  shipCollided(id) {
    const destId = this.ships.all[id].destination;
    const dest = this.planets.all[destId];

    return inCircle(dest.rect, ...this.ships.all[id].rect.center());
  }

  collide(id) {
    if (!this.shipCollided(id)) return;

    const playerShip = this.ships.all[id];
    const destId = playerShip.destination;
    const dest = this.planets.all[destId];

    const pop = playerShip.population;
    const owner = playerShip.owner;

    if (dest.owner == owner) {
      dest.population += pop;
    } else {
      dest.population -= pop;

      if (dest.population < 0) {  // Switch allegiance
        dest.setOwner(owner);
        dest.population = -dest.population;
      }
    }

    this.explosions.add(...playerShip.rect.center());
    delete this.ships.all[id];
  }
}
