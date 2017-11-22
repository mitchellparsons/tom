import Agent from "../../agent";
import Agency from "../../agency";
import * as path from "path";

const actors = {};

export default class implements Agency{

  constructor(options: any) {}
  
  register(actor: any) {
    console.log("Registering ", actor.name, actors)
    actors[actor.name] = actor;
  }

  get(actorName: string): Agent {
    console.log("Agent for " + actorName, actors[actorName])
    return actors[actorName];
  }

  toString() {
    return "memory";
  }
}
