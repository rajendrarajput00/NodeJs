import mongoose from "mongoose";

interface ITodo {
  title: string;
  description: string;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

todoSchema.statics.build = (attr:ITodo)=>{
    return new Todo(attr);
}
const Todo = mongoose.model("Todo", todoSchema);



export { Todo };
