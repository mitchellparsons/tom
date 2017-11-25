import Agency from "./Agency";
import * as path from "path";

async function agencyLoader(config): Promise<Agency> {
  // try core
  try {
    require.resolve(path.join(__dirname, "core.agencies", config.type, "/"));
    let Agency = await import(path.join(__dirname, "core.agencies", config.type, "/"));
    return Promise.resolve(new Agency.default(config));
  } catch (err) {
    console.log("not a core agency", err);
    return null;
  }
  // try plugin
}


export default class AgencyManager {
  public agencies: Agency[];
  constructor(){}

  async loadAgency(config): Promise<void> {
    let agency = await agencyLoader(config);
    this.agencies.push(agency);
    return;
  }

}

// const agencyManager = new AgencyManager();

// export default agencyManager;