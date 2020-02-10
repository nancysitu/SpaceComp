class Bots {
  constructor() {
    this.bots = new Map();

    const IMPORTS = [GreedyBot, SampleBot, SmartBot];

    for (var Class of IMPORTS) {
      this.bots.set(Class.name, new Class());
    }
  }

  getActions(planets, ships, world_state, helper) {
    var final_actions = new Set();

    this.bots.forEach((bot, name) => {
      let your_state = new Map();
      your_state.set("Planets", planets.exportOwner(name));
      your_state.set("Ships", ships.exportOwner(name));

      let helper = new Helper(planets, ships, world_state);
      let actions = bot.action(your_state, world_state, helper);

      actions.forEach((action, actionSame) => {

        console.log(action);

        // Verify correctness
        // Add to final_actions if correct
        final_actions.add(action);
      });
    });

    return final_actions;
  }

  listPlayers() {
    return new Set(this.bots.keys());
  }
}
