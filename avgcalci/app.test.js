const request = require("supertest");
const app = require("./app");

describe("GET /numbers/:numberid", () => {
  it("responds with JSON containing numbers", async () => {
    const response = await request(app).get("/numbers/e");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("windowPrevState");
    expect(response.body).toHaveProperty("windowCurrState");
    expect(response.body).toHaveProperty("numbers");
    expect(response.body).toHaveProperty("avg");
  });
});
