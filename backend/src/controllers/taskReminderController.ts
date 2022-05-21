import { RequestHandler } from "express";
import createHttpError from "http-errors";
import TaskReminderModal from "../models/TaskReminderModal";
var cron = require("node-cron");

export const postTaskReminder: RequestHandler = async (req, res, next) => {
  try {
    const {
      TaskName,
      TaskFrequency,
      /*  Second, */
      Minute,
      Hour,
    }: /*  DayOfMonth,
      Month,
      DayOfWeek, */
    {
      TaskName: string;
      TaskFrequency: string;
      /*  Second: number; */
      Minute: number;
      Hour: number;
      /*  DayOfMonth: number;
      Month: string;
      DayOfWeek: string; */
    } = req.body;
    // const example = await ExampleModal.findOne({ Email });
    // console.log("example", example);

    const NewTaskReminder = new TaskReminderModal({
      TaskName,
      TaskFrequency,
      /* Second, */
      Minute,
      Hour,
      /*  DayOfMonth,
      Month,
      DayOfWeek, */
    });
    await NewTaskReminder.save();

    // cron.schedule("*/10 * * * * *", () => {
    //   console.log("running a task every second");
    //   console.log("running a task through  taskreminder");
    //   //  getApiAndEmit(socket)
    // });

    res.json({ TaskName, TaskFrequency, Minute, Hour });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getTaskReminder: RequestHandler = async (req, res, next) => {
  //return 'nnnn';
  try {
    const filterData = await TaskReminderModal.find();

    res.json({
      filterData: filterData,
      datalen: filterData.length,
    });
  } catch (error) {
    return next(createHttpError.NotFound);
  }
};
