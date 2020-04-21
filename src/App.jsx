import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Nav";
import Planner from "./components/Planner";
import Profile from "./components/Profile";
import { useAuth0 } from "./modules/react-auth0-spa";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav />
      <Route path="/" exact component={Planner} />
      <Route path="/profile" component={Profile} />
    </>
  );
}

export default App;
