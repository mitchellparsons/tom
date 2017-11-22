import Channel from "../../channel";
import * as path from "path";

const actors = {};

export default class implements Channel{

  create(actorConfig: any) {
    console.log("Creating Memory Channel");
    let module = require(path.join(process.cwd(), actorConfig.file));
    actors[actorConfig.name] = module;
  }
  connect(name) {
    return {
      call: (func, ...data) => {
        return actors[name][func](...data);
      }
    }
  }
  toString() {
    return "memory";
  }
}
