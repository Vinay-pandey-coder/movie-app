import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/singup";

  if (hideHeader) return null;


  return (
    <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur text-white shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">


        <div className="flex items-center gap-3">
          <span className="text-4xl text-yellow-400 animate-bounce">🎬</span>
          <h1 className="text-3xl font-extrabold tracking-widest font-sans text-yellow-400 drop-shadow-md">
            Cine<span className="text-white">Flix</span>
          </h1>
        </div>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
