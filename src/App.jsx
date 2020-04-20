import React from "react";
import Nav from "./components/Nav";
import Planner from "./components/Planner";
import { Auth0Provider } from "./modules/react-auth0-spa";
import history from "./modules/history";

function App() {
  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Nav />
      <Planner />
    </Auth0Provider>
  );
}

export default App;
