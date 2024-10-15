import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function UpdateTodo({ isOpen, onClose, todo, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Track request status
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleUpdate = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem('authtoken');
      const response = await axios.put(
        `${url}/api/todo/${todo._id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || 'Todo updated successfully');
      onUpdate(); // Notify parent component to refresh todos
      onClose(); // Close modal after update
    } catch (error) {
      toast.error(error.message || 'Failed to update Todo');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!isOpen || !todo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-20 backdrop-blur-xl">
      <div className="bg-white p-6 rounded-md w-full max-w-screen-md h-[80%] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times text-xl" />
        </button>

        <input
          type="text"
          className="w-full mt-5 px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full h-[70%] px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          disabled={loading} // Disable when loading
          className={`bg-green-500 text-white px-4 py-2 rounded-md ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          } z-50 relative`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
}

export default UpdateTodo;
