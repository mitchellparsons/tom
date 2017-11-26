import Actor from "../../Actor";
import Agency, { AgencyConfig } from "../../Agency";
import * as path from "path";
import * as fs from "fs";

// const actors = {};

class FileSystemAgency implements Agency {

  public name: string;

  public getActorConfig(actorName: string) {
      var actors = this.actors();
      return actors[actorName];
  }
  
  constructor(agencyConfig: AgencyConfig) {
    console.log("Constructing FileSystemAgency " + agencyConfig.name);
    this.name = agencyConfig.name;
    if(agencyConfig.config.filepath) {
      this.path = agencyConfig.config.filepath;
    } else if (agencyConfig.config.relativefilepath) {
      this.path = path.join(process.cwd(), agencyConfig.config.relativefilepath);
    } else {
      throw new Error("'filepath' or 'relativefilepath' not set for AgencyConfig");
    }
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
    console.log("Agency FS reading actors", this)
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
    // console.log("FS Registering ", actor.name, actor.signature());
    var actors = this.actors();
    actors[actor.name] = actor.signature();
    this.setActors(actors);
  }

}

export async function connect(agencyConfig: AgencyConfig): Promise<Agency> {
  return new FileSystemAgency(agencyConfig);
}