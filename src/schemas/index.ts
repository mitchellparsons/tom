import * as path from "path";
import * as Ajv from "ajv";

const version1 = {
  properties: {
    agencies: {
      type: "array"
    },
    actors: {
      type:"array"
    }
  }
}

export default async function validate(schemaName: string, data: any) {
  let ajv = new Ajv();
  let validate = ajv.compile(version1);
  return validate(data);
}