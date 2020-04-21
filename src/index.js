import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { Auth0Provider } from "./modules/react-auth0-spa";
import history from "./modules/history";

axios.defaults.baseURL = "http://localhost:3001/";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={process.env.REACT_APP_AUTH0_CALLBACK_URL}
      onRedirectCallback={onRedirectCallback}
    >
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
