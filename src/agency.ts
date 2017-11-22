import Agent from "./agent";

// TODO: Get rid of "any"
export default interface Agency {
  register(actor: any);
  get(actorName: string): Agent;
  toString();
}

