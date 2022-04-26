"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const todo_1 = require("./routes/todo");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use(todo_1.todoRouter);
mongoose_1.default.connect('mongodb://localhost:27017/todo', () => {
    console.log('connected database');
});
app.listen(3000, () => [console.log(`server start is listening on port 3000`)]);
