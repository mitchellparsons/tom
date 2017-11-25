import * as path from "path";
import boot from "../boot";
import { expect } from "chai";

describe("Boot", () => {

  it('should bootstrap a file', async () => {
    let filepath = path.join(__dirname, "./test.boot.yml");
    let agent = await boot(filepath);
    expect(agent.actors.length).to.equal(1);
    expect(agent.agencies.length).to.equal(1);
  });

});