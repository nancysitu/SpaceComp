/*
For each planet owned, target the nearest planet aggressively.
*/

class SmartBot { // You must pick a new custom name
  name = "SmartBot";

  action(your_state, world_state, helper) {
    var actions = new Set();
    var other_planets = helper.getOtherPlayer(your_state, "Planets");

    // Do nothing
    if (other_planets.size == 0) return actions;

    your_state.get("Planets").forEach((item, id) => {
      if (item.get("Health") > 20) {
        let action = new Map();
        let pop = Math.min(10, item.get("Health"));

        action.set("Health", pop);
        action.set("Type", "Attack");
        action.set("Source ID", id);
        action.set("Source Type", "Planet");


        let targetID = SmartBot.closestPlanet(helper, other_planets, id);
        action.set("Target", targetID);

        actions.add(action);
      }
    });

    return actions;
  }

  static closestPlanet(helper, other_planets, sourceID) {
    var dist = false;
    var closest = null;

    for (var otherID of other_planets) {
      let newDist = helper.getPlanetDistance(sourceID, otherID);
      if (dist === false || newDist < dist) {
        closest = otherID;
        dist = newDist;
      }
    }

    return closest;
  }
}
