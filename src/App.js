import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import store from "./store";
import { loadUser } from "./actions/auth";
import AddDoctor from "./components/admin/addDoctor";
import AddPatient from "./components/admin/addPatient";
import PrivateRoute from "./components/layout/PrivateRoute";
import CommonRoute from "./components/layout/CommonRoute";
import DotorProfile from "./components/doctor/DotorProfile";
import PatientProfile from "./components/patient/PatientProfile";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <CommonRoute exact path="/login" component={Login} />
            <CommonRoute exact path="/" component={Login} />
            <PrivateRoute
              exact
              path="/add-doctor"
              component={AddDoctor}
              role="manager"
            />
            <PrivateRoute
              exact
              path="/add-patient"
              component={AddPatient}
              role="manager"
            />
            <PrivateRoute
              exact
              path="/doctor/profile"
              component={DotorProfile}
              role="doctor"
            />
            <PrivateRoute
              exact
              path="/patient/profile"
              component={PatientProfile}
              role="patient"
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
