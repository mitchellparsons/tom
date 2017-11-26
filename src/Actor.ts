import * as path from "path";
import Channel, { ChannelConfig, ChannelLoader } from "./Channel";
import { ChannelLoader2 } from "./ChannelLoader";

export default interface Actor {
  name: string;
  call(methodName: string, ...data): Promise<any>;
  loadChannel(channelConfig: ChannelConfig);
}

export interface ActorConfig {
  name: string;
  type: string;
  config: any;
}

// export class ActorOld {
  
//   public name: string;
//   public channels: Channel[];
//   public module: any;
//   public methods: string[];
  
//   public signature() {
//     return {
//       name: this.name,
//       methods: this.methods,
//       channels: this.channels.map((channel) => channel.signature())
//     }
//   }

//   public channel(channelName) {
//     let channel = this.channels.find((channel) => {
//       return channel.name === channelName
//     });

//     return channel;
//   }

//   constructor(private actorConfig: any) {
//     this.name = actorConfig.name;
//     if(actorConfig.file) {
//       this.module = require(path.join(process.cwd(), actorConfig.file));
//       this.methods = Object.keys(this.module);
//     }
//     this.channels = [];
//   }

//   async loadChannels() {
//     await Promise.all(this.actorConfig.channels.map( async (channelConfig) =>{
//       let channel: Channel = await (ChannelLoader2(channelConfig.type)).default(channelConfig, this.module);
//       this.channels.push(channel);
//     }));
//   }

//   async connectChannels(channelName) {
//     console.log("Connecting channels")
//     let channelConfig = this.actorConfig[channelName];
//     let channel = await (ChannelLoader2(channelConfig.type)).connect(channelConfig, this.module);
//   }
// }

  
export class ActorLocal implements Actor {

  public channels: Channel[];
  public methods: string[];
  
  // public signature() {
  //   return {
  //     name: this.name,
  //     methods: this.methods,
  //     channels: this.channels.map((channel) => channel.signature())
  //   }
  // }

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
    var thing = await ChannelLoader(channelConfig.type);
    await thing.server(this, channelConfig);
  }

  async loadChannels() {
    await Promise.all(this.actorConfig.channels.map( async (channelConfig) =>{
      let channel: Channel = await (ChannelLoader2(channelConfig.type)).default(channelConfig, this.module);
      this.channels.push(channel);
    }));
  }

  async call(methodName: string, ...data): Promise<any> {
    return  await this.module[methodName](...data);
  }
}

export function ActorFactory(name: string, type: any, config: any): Actor {
  if(type === "local") {
    return new ActorLocal(name, config);
  } else if (type === "foreign") {
    return new ActorLocal(name, config);
  }
  return null;
}