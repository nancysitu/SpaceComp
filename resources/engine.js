class Engine {
  constructor() {
    this.bots = new Bots();
    this.explosions = new Explosions();
    this.planets = new Planets();
    this.ships = new Ships();

    this.planets.initialize(this.bots.listPlayers());
    this.colourManager = new ColourManager(this.bots.listPlayers());

    this.resetEvents();
  }

  resetEvents() {
    this.events = new Map();
    this.events.set("Death", new Set());
    this.events.set("Hit", new Set());
    this.events.set("Player", new Set());
  }

  draw(ctx, dTime) {
    this.planets.draw(ctx, this.colourManager);
    this.ships.draw(ctx, this.colourManager);
    this.explosions.draw(dTime);

    let helper = new Helper(this.planets, this.ships, this.getWorldState());
    this.colourManager.draw(ctx, helper);
  }

  // Takes planet ids
  planetShoot(action) {
    const source_pid = action.get("Source ID");
    const target = action.get("Target");

    if (source_pid == target) return;

    const source = this.planets.find(source_pid);
    const dest = this.planets.find(target);

    const shipHealth = Math.min(source.health, action.get("Health"));
    if (shipHealth == 0) return;

    source.health -= shipHealth;

    const srcPos = source.rect.center();
    const destPos = dest.rect.center();

    const owner = source.owner;

    this.ships.add(...srcPos, ...destPos,
        shipHealth, owner, source_pid, "Planet", target);


  }

  update(dTime) {
    this.ships.all.forEach((ship, id) => {
      ship.move(dTime);
      this.collide(id);
    });

    this.planets.all.forEach((planet, id) => {
      planet.update(dTime);
    });
  }

  doTurn() {
    var actions = this.bots.getActions(this.planets, this.ships,
                                       this.getWorldState());

    this.resetEvents();

    for (var action of actions) {
      this.events.get("Player").add(action);

      if (action.get("Type") == "Attack") {
        if (action.get("Source Type") == "Planet") {
          this.planetShoot(action);
        }
      }
    }
  }

  shipCollided(id) {
    const destId = this.ships.find(id).targetID;
    const dest = this.planets.find(destId);

    return inCircle(dest.rect, ...this.ships.find(id).rect.center());
  }

  collide(id) {
    if (!this.shipCollided(id)) return;

    const playerShip = this.ships.find(id);
    const destId = playerShip.targetID;
    const dest = this.planets.find(destId);

    const pop = playerShip.health;
    const owner = playerShip.owner;

    var offense = dest.takeDamage(owner, pop);

    if (offense) {
      this.explosions.add(...playerShip.rect.center());
    }

    this.ships.remove(id);
  }

  getWorldState() {
    let world_state = new Map();
    world_state.set("Planets", this.planets.exportAll());
    world_state.set("Ships", this.ships.exportAll());
    world_state.set("Events", this.events);
    world_state.set("Alive Players", this.getAlivePlayers());

    return world_state;
  }

  getAlivePlayers() {
    var players = this.bots.listPlayers();
    var alive = new Set();

    for (var id of players) {
      let planets = this.planets.exportOwner(id);
      let ships = this.ships.exportOwner(id);

      if (planets.size + ships.size > 0) {
        alive.add(id);
      }
    }

    return alive;
  }
}
