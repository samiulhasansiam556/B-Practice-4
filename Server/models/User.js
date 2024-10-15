

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;