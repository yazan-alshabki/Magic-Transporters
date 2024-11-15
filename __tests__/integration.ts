import createServer from "../server";
import supertest from "supertest";


const baserote = `http://localhost:3000`;

describe("user routs", () => {
  describe("post user route", () => {
    describe("create magic mover with weight limit less than  or 0", () => {
      it("should return 400", async () => {
        const weightLimit = -1;
        const response = await supertest(baserote)
          .post('/Add-a-Magic-Mover')
          .send({ weightLimit : weightLimit })  // Sending weightLimit in the request body
          .expect(400);        
        expect(response.body.errors[0].message).toBe("The weightLimit must be a number bigger than or equal zero!");
      });
    });
  });
});

