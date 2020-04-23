import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
import addDoctor from "./components/admin/addDoctor";
import addPatient from "./components/admin/addPatient";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/addDoctor" component={addDoctor} />
        <Route exact path="/addPatient" component={addPatient} />
      </Switch>
    </Router>
  );
}

export default App;
