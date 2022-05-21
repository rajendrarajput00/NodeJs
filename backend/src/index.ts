import express from "express";
import { json } from "body-parser";
import createHttpError from "http-errors";
import { DB, PORT } from "./config";
import { todoRouter } from "./routes/todo";
import exampleRoute from "./routes/exampleRoute";
import taskReminderRoute from "./routes/taskReminderRoute";
import adminRoute from "./routes/adminRoute";

import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import { boolean } from "joi";
import cors from "cors";
var cron = require("node-cron");
import { SocketConnection } from "./utils/sockeIo";
import TaskReminderModal from "./models/TaskReminderModal";
const path = require("path");
const viewspath = path.join(__dirname,"/views") 
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(json());
app.use(morgan("dev"));
app.use(todoRouter);
app.use("/",adminRoute)
app.use("/api/", exampleRoute);
app.use("/api/", taskReminderRoute);

app.use(cors());
//set views path
app.set("views", viewspath);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(() => {
  throw createHttpError(404, "Not Found");
});
app.use(errorHandler);
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
//SocketConnection(io);

let interval: any;
/* io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 8000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
}); */

const cronList = [
  {
    frequency: "everyday",
    taskName: "Task run on 16 45",
    time: {
      hour: 16,
      minut: 45,
    },
  },
  {
    frequency: "everyday",
    taskName: "Task run on 16 46",

    time: {
      hour: 16,
      minut: 46,
    },
  },
  {
    frequency: "everyday",
    taskName: "Task run on 16 47",
    time: {
      hour: 16,
      minut: 47,
    },
  },
];

io.on("connection", (socket) => {
  console.log("New client connected");
  // console.log("New client connected",cron.validate());
  // console.log("New client connected",cron.getTasks());

  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
    getApiAndEmit(socket);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = async (socket: any) => {
  const filterData = await TaskReminderModal.find();
  console.log("FILTERDATA", filterData);
  filterData.map((data) => {
    cron.schedule(`00 ${data.Minute} ${data.Hour} * * *`, () => {
      console.log("Send to the client", data.TaskName);
      const response = {
        date: new Date(),
        time: {
          Hour: data.Hour,
          Minute: data.Minute,
        },
        TaskName: data.TaskName,
      };
      // Emitting a new message. Will be consumed by the client
      socket.emit("FromAPI", response);
    });
  });
};

mongoose
  .connect("mongodb://localhost:27017/DEMO")
  .then(() => {
    console.log("Database Connected succesfully");
    server.listen(4000, () => console.log(`Listening on port 4000`));
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect databae");
  });

/* mongoose
  .connect("mongodb://localhost:27017/DEMO")
  .then(() => {
    console.log("Database Connected succesfully");
    app.listen(4000, () => [
      console.log(`server start is listening on port 4000`),
    ]);
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect databae");
  }); */
