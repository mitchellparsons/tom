import Channel from "../../channel";
import { Channel2 } from "../../channel";
import * as path from "path";

export class MemoryChannel implements Channel2{

  constructor(public channelConfig: any, public actorModule: any) {}

  name: string = "memory";

  async call(funcName: string, ...data) {
    console.log("calling call on memory", this.name)
    return this.actorModule[funcName](...data);
  }

}


export default async function setup(channelConfig: any, actorModule: any): Promise<Channel2> {
  return await new MemoryChannel(channelConfig, actorModule);
}