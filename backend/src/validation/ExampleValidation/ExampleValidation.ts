import { RequestHandler } from "express";
import { exampleSchema } from "./ExampleSchema";
import validator from "../../utils/validator";

export const postExampleDataValidation: RequestHandler = (req, res, next) =>
  validator(exampleSchema.postExampleData, req.body, next);
