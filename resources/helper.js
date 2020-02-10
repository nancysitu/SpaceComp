class Helper {
  constructor(planets, ships, world_state) {
    this.planets = planets;
    this.ships = ships;
    this.world_state = world_state;
  }

  getYourState(owner) {
    let your_state = new Map();
    your_state.set("Planets", this.planets.exportOwner(owner));
    your_state.set("Ships", this.ships.exportOwner(owner));

    return your_state;
  }

  getOtherPlayer(your_state, type) {
    // Return a set of IDs

    const my_planets = new Set(your_state.get(type).keys());
    const all_planets = new Set(this.world_state.get(type).keys());

    var other_planets = new Set();
    all_planets.forEach((item, i) => {
      if (!my_planets.has(i)) {
        other_planets.add(i);
      }
    });

    return other_planets;
  }

  getPlanetDistance(idOne, idTwo) {
    return this.planets.getDistance(idOne, idTwo);
  }

  getPlanetDelay(idOne, idTwo) {
    return this.planets.getDistance(idOne, idTwo) / Ship.SPEED;
  }
}
