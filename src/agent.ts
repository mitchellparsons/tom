import * as path from "path";
import Actor, { ActorFactory, ActorConfig } from "./Actor";
import Agency from "./agency";
import Channel, { ChannelConfig } from "./channel";
import ChannelLoader from "./channelLoader";
import { ChannelLoader2 } from "./channelLoader";
import AgencyLoader from "./agencyLoader";
import AgencyManager from "./AgencyManager";


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

  public agency(agencyName: string) {
    return this.agencies.find((agency) => {
      return agency.name === agencyName;
    })
  }

  public async loadAgency(agencyConfig: any) {
    console.log("AGENT  LOAD AGENCY", agencyConfig)
    let agency = await AgencyLoader(agencyConfig);
    this.agencies.push(agency);
  }

  public async addActor(actorConfig: ActorConfig) {
    let actor = ActorFactory(actorConfig.name, actorConfig.type, actorConfig.config);
    if(actorConfig.config.channels) {
      await Promise.all(actorConfig.config.channels.map( async (channelConfig: ChannelConfig) => {
        await actor.loadChannel(channelConfig);
      }));
    }
    this.actors.push(actor)
  }
  // public async addActor(actorConfig: any) {
  //   let actor = new Actor(actorConfig);
  //   await actor.loadChannels();
  //   // register actor with agency
  //   await Promise.all(actorConfig.register.map( async (agency) => {
  //     await this.agencies.find((a) => a.name === agency).register(actor);
  //   }));
  //   this.actors.push(actor);
  // }

  public async connectToActor(connectionConfig: any) {
    // console.log("<1", connectionConfig)
// connect:
// - name: "test1"
//   agency: "filesystem"
    // var agency = this.agency(connectionConfig.agency);
    // var actorSignature = agency.getActorSignature(connectionConfig.name);
    // var actor = new Actor(actorSignature);
    // await actor.connectChannels("http");
    // this.actors.push(actor);
  }

  constructor() {
    this.agencies = [];
    this.actors = [];
  }

  private actors: Actor[];
}
