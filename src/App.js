import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import addDoctor from "./components/admin/addDoctor";
import Nabbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Nabbar />
      <Switch>
        <Route exact path="/" component={addDoctor} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
