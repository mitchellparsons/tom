import * as path from "path";
import Channel from "./Channel";
import { Channel2 } from "./Channel";
import { ChannelLoader2 } from "./ChannelLoader";

export default class Actor {

  public name: string;
  public channels: Channel2[];
  public module: any;
  public methods: string[];
  
  public channel(channelName) {
    console.log("getting channel: ", channelName, this.channels)
    console.log("<<<>><<", this.module)
    let channel = this.channels.find((channel) => {
      return channel.name === channelName
    });

    return channel;
  }

  constructor(private actorConfig: any) {
    this.name = actorConfig.name;
    this.module = require(path.join(process.cwd(), actorConfig.file));
    this.methods = Object.keys(this.module);
    this.channels = [];
  }

  async loadChannels() {
    await Promise.all(this.actorConfig.channels.map( async (channelConfig) =>{
      let channel: Channel2 = await (ChannelLoader2(channelConfig.type)).default(channelConfig, this.module);
      this.channels.push(channel);
    }));
  }  
}
