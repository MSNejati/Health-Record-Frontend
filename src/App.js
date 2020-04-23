import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import Login from "./components/auth/Login";
import store from "./store";
import { loadUser } from "./actions/auth";
import AddDoctor from "./components/admin/addDoctor";
import AddPatient from "./components/admin/addPatient";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/add-doctor" component={AddDoctor} />
            <Route exact path="/add-patient" component={AddPatient} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
