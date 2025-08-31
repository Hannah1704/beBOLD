import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Splash from "./pages/Splash";
import { NavBar } from "./components/NavBar";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();

  const hideNav = location.pathname === "/";

  return (
    <div>
      {!hideNav && <NavBar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Splash />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
