import * as fs from "fs";
import * as path from "path";
import Channel from "./channel";
import Agency from "./agency";
import AgencyLoader from "./agencyLoader";
import ChannelLoader from "./channelLoader";

// Get Agent files

// get environment var for agent file

const agentFile = require(path.join(process.cwd(), "./agent.json"));


load();
async function load() {
  if(agentFile.actors) {
    await agentFile.actors.forEach((actorConfig) => {
      let channels = [];
      actorConfig.channels.forEach( async (channelConfig) => {
        let channel = await ChannelLoader(channelConfig.type);
        //TODO: add channel configs from actorconfig
        channel.create(actorConfig);
        channels.push(channel.toString());
      });
      let methods = Object.keys(require(path.join(process.cwd(), actorConfig.file)));
      let actor = {
        actor: actorConfig.actor,
        channels: channels,
        methods: methods
      }
      actorConfig.agency.forEach( async (agencyConfig) => {
        let agency = await AgencyLoader(agencyConfig);
        //agency.register(actor);
      })
    });
  }

}


// async function getChannel(name): Promise<Channel> {
//   // try core
//   try {
//     require.resolve(path.join(__dirname, "core.channels", name));
//     let Channel = await import(path.join(__dirname, "core.channels", name));
//     return Promise.resolve( new Channel.default());
//   } catch (err) {
//     console.log("not a core channel", err);
//     return null;
//   }
//   // try plugin
// }

// async function getAgency(name): Promise<Agency> {
//   // try core
//   try {
//     require.resolve(path.join(__dirname, "core.agencies", name));
//     let Agency = await import(path.join(__dirname, "core.agencies", name));
//     return Promise.resolve(new Agency.default());
//   } catch (err) {
//     console.log("not a core agency", err);
//     return null;
//   }
//   // try plugin
// }
