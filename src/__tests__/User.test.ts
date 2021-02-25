import request from "supertest";
import { getCustomRepository } from "typeorm";
import { app } from "../app";

import createConnection from "../database";
import { UsersRepository } from "../repositories/UsersRepository";

let connection;
describe("Users", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const userRepository = getCustomRepository(UsersRepository);
    await userRepository.clear();
  });

  it("should be able to add new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example",
    });

    expect(response.status).toBe(400);
  });
});
