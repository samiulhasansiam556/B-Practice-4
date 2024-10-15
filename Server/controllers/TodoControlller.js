import TodoModel from "../models/Todo.js";
import UserModel from "../models/User.js";

class TodoController {


  static createTodo = async (req, res) => {
    const { title, description } = req.body;
    const todo = new TodoModel({ title, description, userId: req.user._id });
    try {
      await todo.save();
      await UserModel.findByIdAndUpdate(req.user._id, { $push: { todos: todo._id } });
      res.send({ status: "success", message: "Todo created successfully" });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to create todo" });
    }
     
  };

  static getTodos = async (req, res) => {
    const todos = await TodoModel.find({ userId: req.user._id });
    res.send({ status: "success", todos });
  };

  static updateTodo = async (req, res) => {
    const { todoId } = req.params;
    const { title, description, completed } = req.body;
    try {
      await TodoModel.findByIdAndUpdate(todoId, { title, description, completed });
      res.send({ status: "success", message: "Todo updated successfully" });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to update todo" });
    }
  };

  static deleteTodo = async (req, res) => {
    const { todoId } = req.params;
    try {
      const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
      if (!deletedTodo) {
        return res.status(404).send({ status: "failed", message: "Todo not found" });
      }
  
      // Optional: Update user document if needed
       await UserModel.findByIdAndUpdate(req.user._id, { $pull: { todos: todoId } });
  
      res.send({ status: "success", message: "Todo deleted successfully" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).send({ status: "failed", message: "Unable to delete todo" });
    }
  };
  
}  

export default TodoController;