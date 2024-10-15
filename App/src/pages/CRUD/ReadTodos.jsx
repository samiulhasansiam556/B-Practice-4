import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import UpdateTodo from "./UpdateTodo";
import CreateTodo from "./CreateTodo";

function ReadTodos() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching todos
  const url = import.meta.env.VITE_SERVER_URL;

  const fetchTodos = async () => {
    setLoading(true); // Set loading to true when fetching begins
    try {
      const token = localStorage.getItem("authtoken");
      const response = await axios.get(`${url}/api/todo/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.todos) {
        setTodos(response.data.todos);
      } else {
        setTodos([]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch todos");
      setTodos([]);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  const handleTodoDeleted = async (deletedTodoId) => {
    setDeletingTodoId(deletedTodoId);
    try {
      const token = localStorage.getItem("authtoken");
      await axios.delete(`${url}/api/todo/${deletedTodoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== deletedTodoId));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Todo");
    } finally {
      setDeletingTodoId(null);
    }
  };

  const openUpdateModal = (todo) => {
    setSelectedTodo(todo);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTodo(null);
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="mt-1">
      <UpdateTodo
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        todo={selectedTodo}
        onUpdate={fetchTodos}
      />
      <CreateTodo isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <i className="text-4xl fa-solid fa-spinner fa-spin text-gray-400" />
        </div>
      ) : todos && todos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-10">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="p-6 bg-slate-700 cursor-pointer text-gray-400 shadow-lg rounded-lg hover:shadow-xl transition-shadow relative"
              onClick={() => openUpdateModal(todo)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the modal from opening when deleting
                  handleTodoDeleted(todo._id);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                {deletingTodoId === todo._id ? (
                  <i className="text-xl fa-solid fa-spinner fa-spin" />
                ) : (
                  <i className="text-xl fa-solid fa-xmark" />
                )}
              </button>
              <h3 className="text-lg font-bold mb-2">{todo.title}</h3>
              <textarea
                className="text-lg bg-slate-700 w-full h-20 mb-2 overflow-hidden resize-none outline-none"
                value={todo.description}
                rows={4}
                readOnly
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-28 items-center justify-center h-48 text-center">
          <p className="text-gray-500">No todos available</p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Add Your First Todo
          </button>
        </div>
      )}
    </div>
  );
}

export default ReadTodos;
