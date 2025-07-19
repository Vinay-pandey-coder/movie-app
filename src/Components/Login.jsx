import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState(""); 

  function handleSubmit(e) {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = storedUsers.find(
      (user) => user.name === state.name && user.password === state.password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setError(""); 
      navigate("/");
    } else {
      setError("Incorrect name or password."); 
    }
  }

  return (
    <div className="relative h-screen w-full">
      <img
        src="image/moviebanner.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-opacity-40"></div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/30 backdrop-blur-md bg-opacity-70 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Login
          </h2>

          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-1"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            id="name"
            onChange={(e) => setState({ ...state, name: e.target.value })}
            required
          />

          <label
            htmlFor="pass"
            className="block text-gray-700 font-semibold mb-1"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            type="password"
            id="pass"
            placeholder="Enter your password"
            onChange={(e) => setState({ ...state, password: e.target.value })}
            required
          />

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;