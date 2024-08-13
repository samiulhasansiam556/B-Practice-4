import express from "express";
import TodoController from "../controllers/TodoControlller.js";
import checkUserAuth from "../middlewares/auth-middeleware.js";

const router = express.Router();

router.post("/create", checkUserAuth, TodoController.createTodo);
router.get("/get", checkUserAuth, TodoController.getTodos);
router.put("/:todoId", checkUserAuth, TodoController.updateTodo);
router.delete("/:todoId", checkUserAuth, TodoController.deleteTodo);

export default router;