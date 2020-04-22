import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
// import Login from "./components/auth/Login";
import addDoctor from "./components/admin/addDoctor";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Login} /> */}
        <Route exact path="/" component={addDoctor} />
        {/* <Route exact path="/admin/addPatient" component={addPatient} /> */}
      </Switch>
    </Router>
  );
}

export default App;
