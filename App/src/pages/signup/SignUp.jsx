import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const url = import.meta.env.VITE_SERVER_URL;
  
  
   
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(url)

    // Input Validation
    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Password and Confirm Password do not match');
      return;
    }

    try {
      // Post request to backend API
      const response = await axios.post(`${url}/api/user/register`, formData);

  
        console.log(response)
      // Handle successful registration
      if (response.data.status === 'success') {
        toast.success(response.data.message, { position: 'top-right' });
        localStorage.setItem("authtoken",response.data.token)
        navigate('/home'); // Redirect to Sign In page
      } else {
        // Handle error response from backend
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err); // Log the full error for debugging

      // Handle cases where err.response is undefined
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 w-96 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
          />
        </div>
        <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign Up
        </button>
        <button
            type="button"
            onClick={() => navigate('/signin')}
            className="w-full bg-green-500 text-white p-2 my-3 rounded hover:bg-green-600"
          >
            I have an account
          </button>
      </form>
    </div>
  );
}

export default SignUp;
