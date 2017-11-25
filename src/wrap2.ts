import * as path from "path";
import * as fs from "fs";
import { boot } from "./Boot";

try {
  if (fs.existsSync(path.join(process.cwd(), "tom.json"))){
    boot(path.join(process.cwd(), "tom.json"));
  } else if(fs.existsSync(path.join(process.cwd(), "tom.yml"))) {
    boot(path.join(process.cwd(), "tom.yml"));
  }  else if(fs.existsSync(path.join(process.cwd(), "tom.yaml"))) {
    boot(path.join(process.cwd(), "tom.yaml"));
  } else {
    console.log("Cannot find Tom file.")
  }
} catch (err) {
  console.log("Critical Error Booting Agent", err);
}
