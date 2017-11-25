import Agent from "../../agent";
import Agency from "../../agency";
import * as path from "path";
import * as fs from "fs";

const actors = {};

export default class FileSystemAgency implements Agency{

  constructor(options: any) {
    console.log("Constructing FileSystemAgency")
    this.path = options.path;
  }

  private path: string;

  private readFile(path) {
    if(fs.existsSync(path)) {
      let contents = fs.readFileSync(path, "utf8");
      return JSON.parse(contents);
    } else {
      return {}
    }
  }

  private writeFile(path, data) {
    console.log("Writing file", path, data)
    fs.writeFileSync(path, JSON.stringify(data), "utf8");
  }

  register(actorConfig: any) {
    var actors = this.readFile(this.path);
    console.log("FS Registering ", actorConfig, actors);
    actors[actorConfig.actor] = actorConfig;
    this.writeFile(this.path, actors);
  }

  getAgent(actorName: string): Agent {
    var actors = this.readFile(this.path);
    console.log("Agent for " + actorName, actors[actorName])
    return new Agent(actors[actorName]);
  }

  toString() {
    return "memory";
  }
}
