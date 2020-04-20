import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">RUN PLANNER</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <button>Login</button>
      </ul>
    </nav>
  );
}

export default Nav;
