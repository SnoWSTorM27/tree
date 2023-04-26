import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/ui/navBar";
import AppLoader from "./components/ui/hoc/appLoader";
import Section from "./components/layouts/section";
import Tree from "./components/layouts/tree";
import d3Tree from "./components/layouts/d3tree";

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          {/* <Route path="/login/:type?" component={Login} /> */}
          <Route exact path="/" component={Tree} />
          {/* <Route path="/" component={d3Tree} /> */}
          {/* <Route path="/:section?/:subsection?" component={Section} /> */}
          <Redirect to="/" />
        </Switch>
      </AppLoader>
    </>
  );
}

export default App;
