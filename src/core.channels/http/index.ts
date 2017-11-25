import Channel from "../../channel";
import { Channel2 } from "../../channel";
import * as path from "path";
import * as http from "http";
import * as url from "url";

export class HttpChannel implements Channel2{

  public name: string = "http";
  
  constructor(public channelConfig: any, public actorModule: any) {

    this.server = http.createServer( async (req, res) => {
      res.statusCode = 200;

      res.setHeader('Content-Type', 'text/plain');
      // let val = await this.call(req.url.replace("/",""));
      // console.log("responding with: ", val)
      // res.end(val);
      res.end(await this.call(req.url.replace("/","")));
    });
    
    this.server.listen(channelConfig.port, channelConfig.hostname, () => {
      console.log(`Server running at http://${channelConfig.hostname}:${channelConfig.port}/`);
    });

  }

  private server: http.Server;
  
  async call(funcName: string, ...data) {
    console.log("calling call on http", this.name)
    return this.actorModule[funcName](...data);
  }

}

export default async function setup(channelConfig: any, actorModule: any): Promise<Channel2> {
  return await new HttpChannel(channelConfig, actorModule);
}