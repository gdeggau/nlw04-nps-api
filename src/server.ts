import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "ok" });
});

app.post("/", (req, res) => {
  return res.status(200).json({ message: "ok" });
});

app.listen(9000, () => console.log("Server is running!"));
