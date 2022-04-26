import Joi from "joi";
export const exampleSchema = {
  postExampleData: Joi.object({
    Name: Joi.string().required(),
    ID: Joi.number().required(),
    Number: Joi.number(),
    Email: Joi.string().required(),
    Address: Joi.string().required(),
  }),
};
