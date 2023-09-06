const app = require("../app");
const request = require("supertest");

describe("Express.js application", () => {
  it("should create a new user", async () => {
    const data = {
      name: "Tester",
      email: "test1@example.com",
      phone: 1234567890,
    };

    const response = await request(app).post("/create").send(data);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(data.name);
    expect(response.body.email).toBe(data.email);
    expect(response.body.phone).toBe(data.phone);
  });

  it("should update a user by email", async () => {
    const data = {
      name: "Updated User",
    };

    const response = await request(app)
      .patch("/update/test1@example.com")
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(data.name);
  });

  it("should get all users", async () => {
    const response = await request(app).get("/read");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a user by email", async () => {
    const response = await request(app).get("/read/test1@example.com");

    expect(response.status).toBe(200);
    expect(response.body.email).toBe("test1@example.com");
  });

  it("should delete a user by email", async () => {
    const response = await request(app).delete("/delete/test1@example.com");

    expect(response.status).toBe(200);
    expect(response.body.email).toBe("test1@example.com");
  });

  //error handling

  it("should return a 404 error when trying to update a non-existent user", async () => {
    const data = {
      name: "Updated User",
    };

    const response = await request(app)
      .patch("/update/nonexistent@example.com")
      .send(data);

    expect(response.status).toBe(404);
  });

  it("should return a 400 error when trying to update a user without specifying email", async () => {
    const data = {
      name: "Updated User",
    };

    const response = await request(app).patch("/update/").send(data);

    expect(response.status).toBe(400);
  });

  it("should return a 404 error when trying to delete a non-existent user", async () => {
    const response = await request(app).delete(
      "/delete/nonexistent@example.com"
    );

    expect(response.status).toBe(500);
  });

  it("should return a 400 error when trying to delete a user without specifying email", async () => {
    const response = await request(app).delete("/delete/");

    expect(response.status).toBe(400);
  });

  it("should return a 500 error when there is a server error during user deletion", async () => {
    const response = await request(app).delete("/delete/error@example.com");

    expect(response.status).toBe(500);
  });
});
