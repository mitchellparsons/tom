import Agent from "./agent";
import AgencyLoader from "./agencyLoader";

export = async function(options: any) {
  let agency = await AgencyLoader(options.type);
  return {
    getAgent(actorName): Agent {
      return agency.get(actorName);
    }
  }
}
