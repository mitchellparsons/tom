import Actor from "../../Actor";
import Agent from "../../agent";
import Agency from "../../agency";
import * as path from "path";

const actors = {};

export default class MemoryAgency implements Agency{

  public name: string = "memory";
  
  constructor(options: any) {
    console.log("Creating Memory Agency")
  }
  
  register(actor: Actor) {
    console.log("MEM Registering ", actor.name)
    actors[actor.name] = actor.signature();
  }

  getAgent(actorName: string): Agent {
    console.log("Agent for " + actorName, actors[actorName])
    return new Agent(actors[actorName]);
  }

  toString() {
    return "memory";
  }
}
