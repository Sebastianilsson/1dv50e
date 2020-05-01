import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./features/user/Login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Login />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
