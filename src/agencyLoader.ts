import * as path from "path";
import Agency from "./agency";

export default async function(config): Promise<Agency> {
  // try core
  try {
    require.resolve(path.join(__dirname, "core.agencies", config.type, "/"));
    let Agency = await import(path.join(__dirname, "core.agencies", config.type, "/"));
    return Promise.resolve(new Agency.default(config));
  } catch (err) {
    console.log("not a core agency", err);
    return null;
  }
  // try plugin
}
