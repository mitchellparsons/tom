import * as path from "path";
import Actor, { ActorFactory, ActorConfig } from "./Actor";
import Agency, { AgencyConfig, AgencyLoader } from "./Agency";
import Channel, { ChannelConfig } from "./channel";
import ChannelLoader from "./channelLoader";
import { ChannelLoader2 } from "./channelLoader";
// import AgencyLoader from "./agencyLoader";
// import AgencyManager from "./AgencyManager";


export default class Agent {

  public agencies: Agency[];
  // private channels: Channel[];
  

  public actor(actorName: string) {
    let actor= this.actors.find((actor) => {
      return actor.name === actorName;
    });
    if(actor) return actor;
    throw new Error("actor does not exist");
  }

  public agency(agencyName: string): Agency {
    return this.agencies.find((agency) => {
      return agency.name === agencyName;
    })
  }

  public async connectToAgency(agencyConfig: AgencyConfig) {
    let agencySetup = await AgencyLoader(agencyConfig.type);
    let agency = await agencySetup.connect(agencyConfig);
    this.agencies.push(agency);
  }


  public async addActor(actorConfig: ActorConfig) {
    // if foreign get config
    if(actorConfig.type === "foreign") {
      actorConfig.config = await this.agency(actorConfig.config.agency).getActorConfig(actorConfig.name)
      // console.log("ima here!", actorConfig.config)
      // do some combination here??
      // overwrite with default values
    }

    let actor = ActorFactory(actorConfig.name, actorConfig.type, actorConfig.config);
    if(actorConfig.config.channels) {
      await Promise.all(actorConfig.config.channels.map( async (channelConfig: ChannelConfig) => {
        await actor.loadChannel(channelConfig);
      }));
    }
    this.actors.push(actor)
    // register actor with agency
    if(actorConfig.config.register) {
      this.agency(actorConfig.config.register).register(actor);
    }
  }


  constructor() {
    this.agencies = [];
    this.actors = [];
  }

  private actors: Actor[];
}
