import request from "supertest";
import { getCustomRepository } from "typeorm";
import { app } from "../app";

import createConnection from "../database";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";

let connection;
describe("Surveys", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const userRepository = getCustomRepository(UsersRepository);
    await userRepository.clear();

    const surveysRepository = getCustomRepository(SurveysRepository);
    await surveysRepository.clear();
  });

  it("should be able to add new usrvey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title Example",
      description: "Description Example",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("shoul be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title Example2",
      description: "Description Example2",
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});
