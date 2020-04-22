import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import Login from "./components/auth/Login";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
