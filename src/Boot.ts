import * as fs from "fs";
import * as jsyaml from "js-yaml";
import Agent from "./Agent";
import { Subject } from "rxjs"
import validate from "./schemas";

let subject = new Subject<Agent>();
let agent = new Agent();



async function boot(filepath: string): Promise<Agent> {
  
  let agentFile;
  if(filepath.endsWith(".yml") || filepath.endsWith(".yaml")) {
    agentFile = jsyaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
  } else {
    agentFile = require(filepath);
  }
  var version = agentFile.version;
  // var valid = await validate(version+ ".json", agentFile);
  // if(!valid) {
  //   return Promise.reject("Not a valid version " + version);
  // }
  

  if(agentFile.actors) {
    await Promise.all(agentFile.actors.map( async (actorConfig) => {
      return await agent.addActor(actorConfig);
    }));
  }

  subject.next(agent);
  return agent;
}

// async function bootOld(filepath: string): Promise<Agent> {
  
//   let agentFile;
//   if(filepath.endsWith(".yml") || filepath.endsWith(".yaml")) {
//     agentFile = jsyaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
//   } else {
//     agentFile = require(filepath);
//   }
//   var version = agentFile.version;
//   var valid = await validate(version+ ".json", agentFile);
//   if(!valid) {
//     return Promise.reject("Not a valid version " + version);
//   }
  
//   if(agentFile.agencies) {
//     await Promise.all(agentFile.agencies.map( async (agencyConfig) =>{
//       return await agent.loadAgency(agencyConfig)
//     }));
//   }
  
//   if(agentFile.connect) {
//     await Promise.all(agentFile.connect.map(async (connection) => {
//       return await agent.connectToActor(connection);
//     }));
//   }

//   if(agentFile.actors) {
//     await Promise.all(agentFile.actors.map( async (actorConfig) => {
//       return await agent.addActor(actorConfig);
//     }));
//   }

//   subject.next(agent);
//   return agent;
// }
export {
  boot,
  subject
}
