import { Schema, model, Document } from "mongoose";

export interface IExample extends Document {
  TaskName: string;
  TaskFrequency: string;
  /* Second: number; */
  Minute: number;
  Hour: number;
  /* DayOfMonth: number;
  Month: string;
  DayOfWeek: string; */
}

const TaksReminderSchema: Schema = new Schema({
  TaskName: { type: String },
  TaskFrequency: { type: String },
 /*  Second: { type: Number }, */
  Minute: { type: Number },
  Hour: { type: Number },
 /*  DayOfMonth: { type: Number },
  Month: { type: String },
  DayOfWeek: { type: String }, */
});

export default model<IExample>("TaskReminder", TaksReminderSchema);
