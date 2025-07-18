import React from "react";

/**  navbar  components */

import Home from "./Components/Home";
import MovieList from "./Components/MovieList";
import WatchLater from "./Components/WatchLater";

/** login components */

import Login from "./Components/Login";
import SignUp from "./Components/SingUp";
import Error from "./Components/Error"
import Header from "./Components/Header";

/** Router */
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/singup" element={<SignUp />} />
          <Route path="/error" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
