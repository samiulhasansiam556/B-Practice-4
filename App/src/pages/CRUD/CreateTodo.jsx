import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function CreateTodo({ isModalOpen, setIsModalOpen }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    try {
      const token = localStorage.getItem('authtoken');
      const response = await axios.post(`${url}/api/todo/create`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setIsModalOpen(false); 
    } catch (error) {
      toast.error(error.message || 'Failed to create todo');
    }
  };

  return (
    <>
     
      <button
        onClick={() => setIsModalOpen(true)} // Open the modal on click
        className="fixed bottom-8 right-10 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 z-50"
      >
        Create Note
      </button>


      {isModalOpen && (
   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 md:h-screen md:flex-1">
    <div className="bg-white p-6 md:w-1/2 sm:w-1/2 rounded-md shadow-lg relative w-full sm:w-xl lg:max-w-3xl  h-[80%]">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <h2 className="text-xl font-semibold mb-4">Create Todo</h2>
      <input
        type="text"
        className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full lg:h-[70%]  h-[70%]  px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 z-50 relative"
      >
        Create
      </button>
    </div>
  </div>
)}
    </>
  );
}

export default CreateTodo;
