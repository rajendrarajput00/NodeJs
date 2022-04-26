import express, { ErrorRequestHandler } from "express";
import { json } from "body-parser";
import createHttpError from "http-errors";
import { DB, PORT } from "./config";
import { todoRouter } from "./routes/todo";
import exampleRoute from "./routes/exampleRoute";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(json());
app.use(morgan('dev'));
app.use(todoRouter);
app.use("/api/", exampleRoute);

app.use(() => {
  throw createHttpError(404, "Not Found");
});
app.use(errorHandler);

mongoose
  .connect("mongodb://localhost:27017/DEMO")
  .then(() => {
    console.log("Database Connected succesfully");
    app.listen(4000, () => [
      console.log(`server start is listening on port 3000`),
    ]);
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect databae");
  });
