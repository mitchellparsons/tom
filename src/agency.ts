import Actor from "./Actor";
import Agent from "./agent";

// TODO: Get rid of "any"
export default interface Agency {
  name: string;
  register(actor: Actor);
  getAgent(actorName: string): Agent;
  toString();
}

