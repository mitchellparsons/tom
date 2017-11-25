import Agent from "../../agent";
import Agency from "../../agency";
import * as path from "path";

const actors = {};

export default class MemoryAgency implements Agency{

  constructor(options: any) {
  }
  
  register(actorConfig: any) {
    console.log("MEM Registering ", actorConfig.actor, actors)
    actors[actorConfig.actor] = actorConfig;
  }

  getAgent(actorName: string): Agent {
    console.log("Agent for " + actorName, actors[actorName])
    return new Agent(actors[actorName]);
  }

  toString() {
    return "memory";
  }
}
