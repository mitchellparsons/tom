import * as path from "path";
import Actor from "./Actor";
import Agency from "./agency";
import Channel from "./channel";
import ChannelLoader from "./channelLoader";
import { ChannelLoader2 } from "./channelLoader";
import AgencyLoader from "./agencyLoader";
import AgencyManager from "./AgencyManager";

export default class Agent {
  
  public actor: string;
  public channels: any[];
  public methods: any[];

  constructor(public agentConfig) {
    console.log("creating agent", agentConfig);
    this.actor = agentConfig.actor;
    this.channels = agentConfig.channels;
    this.methods = agentConfig.methods;
  }

  async connect(channelConfig: any) {
    let channel = await ChannelLoader(channelConfig.type);
    return channel.connect(this.actor);
  }
}

export class Agent2 {

  public agencies: Agency[];
  // private channels: Channel[];
  public actors: Actor[];

  public actor(actorName: string) {
    let actor= this.actors.find((actor) => {
      return actor.name === actorName;
    });
    if(actor) return actor;
    throw new Error("actor does not exist");
  }

  constructor() {
    this.agencies = [];
    this.actors = [];
  }

  async loadAgency(agencyConfig: any) {
    let agency = await AgencyLoader(agencyConfig);
    this.agencies.push(agency);
  }

  async addActor(actorConfig: any) {
    let actor = new Actor(actorConfig);
    await actor.loadChannels();
    this.actors.push(actor);
  }

}

export async function Tom2(actorConfig: any): Promise < Agent2 > {

  let agencies = await Promise.all(actorConfig.agencies.map(async(agencyConfig) => {
    return await AgencyLoader(agencyConfig)
  }));

  let channels = await Promise.all(actorConfig.channels.map(async(channelConfig) => {
    return await ChannelLoader(channelConfig);
  }));

  return new Agent2();

}