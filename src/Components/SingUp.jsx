import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });

function handleSubmit(e) {
  e.preventDefault();

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  existingUsers.push(formData);

  localStorage.setItem("users", JSON.stringify(existingUsers));
  localStorage.setItem("currentUser", JSON.stringify(formData)); // ✅ Save the logged-in user

  navigate('/');
}



  return (
    <div className="relative min-h-screen">

      <img
        src="image/moviebanner2.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/30 backdrop-blur-md bg-opacity-90 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Sign Up</h2>

          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <label htmlFor="pass" className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="pass"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <input
            type="submit"
            value="Sign Up"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
