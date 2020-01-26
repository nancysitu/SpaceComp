class Game {
  constructor() {
    this.planets = new Planets();
    this.ships = new Ships();
  }

  draw(ctx) {
    this.planets.draw(ctx);
    this.ships.draw(ctx);
  }

  makeShip(source_id, target_id, count) {
    
  }
}
