import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/home">Home</Link> |{" "}
      <Link to="/profile">Profile</Link> |{" "}
      <Link to="/projects">Projects</Link> |{" "}
      <Link to="/">Logout</Link>
    </nav>
  );
}

export { NavBar };
