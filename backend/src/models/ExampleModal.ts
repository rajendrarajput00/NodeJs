import { number, string } from "joi";
import { Schema, model, Document } from "mongoose";

export interface IExample extends Document {
  Name: string;
  ID: number;
  Number: number;
  Email: string;
  Address: string;
}

const ExampleSchema: Schema = new Schema({
  Name: { type: String },
  ID: { type: String },
  Number: { type: Number },
  Email: { type: String },
  Address: { type: String },
});

export default model<IExample>("Example", ExampleSchema);
