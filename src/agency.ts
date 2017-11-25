import Agent from "./agent";

// TODO: Get rid of "any"
export default interface Agency {
  register(actorConfig: any);
  getAgent(actorName: string): Agent;
  toString();
}

