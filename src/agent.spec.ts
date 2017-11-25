import { Tom2 } from "./agent";
import { expect } from 'chai';


describe("Agent", () => {

  describe("Factory", () => {

    const test1Config = {
        "actor": "test1",
        "file": "test1",
        "channels": [{
          "type": "memory"
        }],
        "agencies": [{
          "type": "memory"
        }]
    }

    it('should return an Agent', async () => {
      let agent =  await Tom2(test1Config);
      console.log("<<<<<1", agent);
      // console.log("<<<<<2", agent.agencies);
      // agent.agencies.then((agencies)=> {
      //   console.log("<<<<<3", agencies)
      // })
      expect(agent).to.be.not.null;
    });

    

  });

});