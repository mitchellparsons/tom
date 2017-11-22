import * as path from "path";
import Agency from "./agency";

export default async function(name): Promise<Agency> {
  // try core
  try {
    require.resolve(path.join(__dirname, "core.agencies", name));
    let Agency = await import(path.join(__dirname, "core.agencies", name));
    return Promise.resolve(new Agency.default());
  } catch (err) {
    console.log("not a core agency", err);
    return null;
  }
  // try plugin
}
