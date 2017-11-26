import Actor from "./Actor";
import * as path from "path";

// TODO: Get rid of "any"
export default interface Channel {
  name: string;
  call(funcName: string, ...data);
  // create(actorConfig: any);
  // connect(actorName: string);
  // toString();
  signature();
}

export interface ChannelConfig {
  name: string;
  type: string;
  config: any;
}

export interface ChannelSetup {
  server(actor: Actor, config: ChannelConfig): Promise<Channel>;
  client(actor: Actor, config: ChannelConfig): Promise<Channel>;
}

export async function ChannelLoader(type): Promise<ChannelSetup> {
  // try core
  try {
    require.resolve(path.join(__dirname, "core.channels", type, "/"));
    let channelSetup = await import(path.join(__dirname, "core.channels", type, "/"));
    return Promise.resolve(channelSetup);
  } catch (err) {
    console.log("not a core channel", err);
    return null;
  }
  // try plugin
}