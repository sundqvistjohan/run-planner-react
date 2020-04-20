import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../modules/react-auth0-spa"

function Nav() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">RUN PLANNER</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Login</button>
        )}
        {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
      </ul>
    </nav>
  );
}

export default Nav;
