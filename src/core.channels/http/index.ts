import Channel, { ChannelConfig } from "../../Channel";
import Actor from "../../Actor";
import * as http from "http";
import * as url from "url";

class HttpChannelServer implements Channel{

  public name: string = "http";
  
  // constructor(public channelConfig: any, public actorModule: any) {
  constructor(private actor: Actor, private channelConfig: ChannelConfig) {

    this.server = http.createServer( async (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(await this.call(req.url.replace("/","")));
    });
    
    this.server.listen(channelConfig.config.port, channelConfig.config.hostname, () => {
      console.log(`Server running at http://${channelConfig.config.hostname}:${channelConfig.config.port}/`);
    });

  }

  private server: http.Server;
  
  async call(funcName: string, ...data) {
    console.log("calling call on http", this.name)
    return this.actor.call(funcName, ...data);
  }
}

class HttpChannelClient implements Channel{
  
    public name: string = "http";
    
    // constructor(public channelConfig: any, public actorModule: any) {
    constructor(private actor: Actor, private channelConfig: ChannelConfig) {
      this.host = channelConfig.config.host;
      this.port = channelConfig.config.port;
    }

    private host: string;
    private port: string;

    async call(funcName: string, ...data) {
      return await new Promise((resolve, reject) => {
        http.get(`http://${this.host}:${this.port}/${funcName}`, (resp) => {
          let data = '';
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            var json  = JSON.parse(data).explanation;
            console.log("DING DING!", json);
            resolve(json);
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

        console.log("calling call on http", this.name)
        // return this.actorModule[funcName](...data);
      });
    }
    
    // signature() {
    //   return this.channelConfig;
    // }
  }

export async function server(actor: Actor, channelConfig: ChannelConfig): Promise<Channel> {
  return await new HttpChannelServer(actor, channelConfig);
}

export async function client(actor: Actor, channelConfig: ChannelConfig): Promise<Channel> {
  return await new HttpChannelClient(actor, channelConfig);
}
