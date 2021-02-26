import "reflect-metadata";
import express from "express";
import createConnection from "./database";
import { router } from "./routes";

if (process.env.NODE_ENV !== "test") {
  createConnection();
}

const app = express();

app.use(express.json());
app.use(router);

export { app };
