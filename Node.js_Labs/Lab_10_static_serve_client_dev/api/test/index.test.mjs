import axios from "axios";
import { expect } from "chai";

describe("Test that API is up and running", () => {
  it("should return an array (GET /users)", async () => {
    const res = await axios.get("http://localhost:4000/api/health-check");
    expect(res.status).to.equal(200);
  });
  it("get users failed not token", async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users");
    } catch (error) {
      expect(error.status).to.equal(500);
      // console.log(error);
    }
  });
});
