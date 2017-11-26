import Actor, { ActorFactory } from "./Actor";
import Agent from "./agent";
import * as path from "path";

// TODO: Get rid of "any"
export default interface Agency {
  name: string;
  register(actor: Actor);
  getActorConfig(actorName: string);
  // getAgent(actorName: string): Agent;
  // getActorSignature(actorName: string);
  // toString();
}

// agencies:
// - name: "agency1"
//   type: "filesystem"
//   config:
//     relativefilepath: "fsdata.json"
export interface AgencyConfig {
  name: string;
  type: string;
  config: any;
}

export interface AgencySetup {
  connect(agencyConfig: AgencyConfig): Promise<Agency>;
}

export async function AgencyLoader(type): Promise<AgencySetup> {
  // try core
  try {
    require.resolve(path.join(__dirname, "core.agencies", type, "/"));
    let agencySetup = await import(path.join(__dirname, "core.agencies", type, "/"));
    return Promise.resolve(agencySetup);
  } catch (err) {
    console.log("not a core agency", err);
    return null;
  }
  // try plugin
}