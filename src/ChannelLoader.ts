import * as path from "path";
import Channel from "./channel";

export default async function(config): Promise<Channel> {
  // try core
  try {
    require.resolve(path.join(__dirname, "core.channels", config.type, "/"));
    let Channel = await import(path.join(__dirname, "core.channels", config.type, "/"));
    return Promise.resolve(new Channel.default());
  } catch (err) {
    console.log("not a core channel", err);
    return null;
  }
  // try plugin
}

export function ChannelLoader2(type): any {
  try {
    let module = require(path.join(__dirname, "core.channels", type, "/"));
    return module;
  } catch (err) {
    console.log("not a core agency")
  }
}
