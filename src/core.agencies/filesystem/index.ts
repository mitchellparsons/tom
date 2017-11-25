import Actor from "../../Actor";
import Agent from "../../agent";
import Agency from "../../agency";
import * as path from "path";
import * as fs from "fs";

const actors = {};

export default class FileSystemAgency implements Agency{

  public name: string = "filesystem";

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

  private actors() {
    if(fs.existsSync(this.path)) {
      let contents = fs.readFileSync(this.path, "utf8");
      return JSON.parse(contents);
    } else {
      return {}
    }
  }

  private setActors(data) {
    fs.writeFileSync(this.path, JSON.stringify(data), "utf8");
  }

  private writeFile(path, data) {
    console.log("Writing file", path, data)
    fs.writeFileSync(path, JSON.stringify(data), "utf8");
  }

  register(actor: Actor) {
    console.log("FS Registering ", actor.name);
    var actors = this.actors();
    actors[actor.name] = actor.signature();
    this.setActors(actors);
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
