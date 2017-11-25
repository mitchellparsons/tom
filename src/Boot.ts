import * as fs from "fs";
import * as jsyaml from "js-yaml";
import { Agent2 } from "./Agent";
import { Subject } from "rxjs"
import validate from "./schemas";

let subject = new Subject<Agent2>();
let agent = new Agent2();

async function boot(filepath: string): Promise<Agent2> {
  
  let agentFile;
  if(filepath.endsWith(".yml") || filepath.endsWith(".yaml")) {
    agentFile = jsyaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
  } else {
    agentFile = require(filepath);
  }
  var version = agentFile.version;
  var valid = await validate(version+ ".json", agentFile);
  if(!valid) {
    return Promise.reject("Not a valid version " + version);
  }
  await Promise.all(agentFile.agencies.map( async (agencyConfig) =>{
    return await agent.loadAgency(agencyConfig)
  }));
  
  await Promise.all(agentFile.actors.map( async (actorConfig) => {
    return await agent.addActor(actorConfig);
  }));

  subject.next(agent);
  return agent;
}

export {
  boot,
  subject
}
