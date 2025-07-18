import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="relative flex items-center justify-between gap-4">
      {user ? (
        <>
          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl cursor-pointer"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Menu links */}
          <div
            className={`${
              menuOpen
                ? "flex flex-col space-y-2 bg-black/80 p-9 absolute top-14 right-0 w-[150px] z-50"
                : "hidden"
            } md:relative md:flex md:flex-row md:space-x-6 md:space-y-0 text-white font-medium`}
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 font-bold text-[20px]"
            >
              Home
            </Link>
            <Link
              to="/movielist"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 font-bold text-[20px]"
            >
              Movies
            </Link>
            <Link
              to="/watchlater"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 font-bold text-[20px]"
            >
              watchlater
            </Link>
          </div>

          {/* User icon and dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-white hover:text-yellow-400 focus:outline-none cursor-pointer"
            >
              <FaUserCircle size={28} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <div className="px-4 py-2 border-b font-semibold">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Only Login/Signup when NOT logged in
        <div className="space-x-4 text-white font-medium">
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>
          <Link to="/singup" className="hover:text-yellow-400">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
