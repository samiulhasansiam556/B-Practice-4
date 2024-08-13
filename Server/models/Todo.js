import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;