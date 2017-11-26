import * as path from "path";
import Channel, { ChannelConfig, ChannelLoader } from "./Channel";

export default interface Actor {
  name: string;
  call(methodName: string, ...data): Promise<any>;
  loadChannel(channelConfig: ChannelConfig);
  signature();
}

export interface ActorConfig {
  name: string;
  type: string;
  config: any;
}
  
export class ActorLocal implements Actor {

  public channels: Channel[];
  public methods: string[];
  
  public signature() {
    return {
      name: this.name,
      methods: this.methods,
      channels: this.channels.map((channel) => channel.signature())
    }
  }

  public channel(channelName) {
    let channel = this.channels.find((channel) => {
      return channel.name === channelName
    });

    return channel;
  }

  constructor(public name: string, public actorConfig: any) {
    this.name = name;
    this.module = require(path.join(process.cwd(), actorConfig.file));
    this.methods = Object.keys(this.module);
    this.channels = [];
  }

  private module: any;
  
  async loadChannel(channelConfig: ChannelConfig) {
    var channel = await (await ChannelLoader(channelConfig.type)).server(this, channelConfig);
    this.channels.push(channel);
  }

  async call(methodName: string, ...data): Promise<any> {
    return  await this.module[methodName](...data);
  }
}



export class ActorForeign implements Actor {

  public channels: Channel[];
  public methods: string[];
  
  public signature() {
    return {
      name: this.name,
      methods: this.methods,
      channels: this.channels.map((channel) => channel.signature())
    }
  }

  public channel(channelName) {
    let channel = this.channels.find((channel) => {
      return channel.name === channelName
    });

    return channel;
  }

  constructor(public name: string, public actorConfig: any) {
    this.name = name;
    this.methods = this.actorConfig.methods;
    this.channels = [];
  }

  private module: any;

  async loadChannel(channelConfig: ChannelConfig) {
    var channel = await (await ChannelLoader(channelConfig.type)).client(this, channelConfig);
    this.channels.push(channel);
  }

  async call(methodName: string, ...data): Promise<any> {
    // defaults to first channel
    // TODO: add logic to select channel correctly
    let channel = this.channels[0];
    return await channel.call(methodName, ...data);
  }
}

export function ActorFactory(name: string, type: any, config: any): Actor {
  if(type === "local") {
    return new ActorLocal(name, config);
  } else if (type === "foreign") {
    return new ActorForeign(name, config);
  }
  return null;
}