import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
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
import Turns from "./components/patient/Turns";
import Reserve from "./components/patient/Reserve";
import PatientsList from "./components/admin/patientsList";
import DoctorsList from "./components/admin/doctorsList";
import ManageTurns from "./components/doctor/ManageTurns";
import Appointments from "./components/doctor/Appointments";
import AppointmentManage from "./components/doctor/AppointmentManage";
import MedicalHistory from "./components/patient/MedicalHistory";

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
              path="/doctors"
              component={DoctorsList}
              role="manager"
            />
            <PrivateRoute
              exact
              path="/patients"
              component={PatientsList}
              role="manager"
            />
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
              path="/doctors/:id"
              component={DotorProfile}
              role="manage"
            />
            <PrivateRoute
              path="/patients/:id"
              component={PatientProfile}
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
              path="/doctor/calendar"
              component={ManageTurns}
              role="doctor"
            />
            <PrivateRoute
              exact
              path="/doctor/app"
              component={Appointments}
              role="doctor"
            />
            <PrivateRoute
              exact
              path="/doctor/app/:id"
              component={AppointmentManage}
              role="doctor"
            />
            <PrivateRoute
              exact
              path="/patient/profile"
              component={PatientProfile}
              role="patient"
            />
            <PrivateRoute
              exact
              path="/patient/turns"
              component={Turns}
              role="patient"
            />
            <PrivateRoute
              exact
              path="/patient/turns/:id"
              component={Reserve}
              role="patient"
            />
            <PrivateRoute
              exact
              path="/patient/history"
              component={MedicalHistory}
              role="patient"
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
