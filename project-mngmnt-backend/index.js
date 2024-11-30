import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import projectsRouter from "./routes/projectsRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello! I'm running just fine Mr Salman");
});

app.use("/api/users", userRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("App connected to database");
    app.listen(4000, () => {
      console.log(`App is listening to port: 4000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
