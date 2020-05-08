import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./features/user/Login";
import PrivateUserPage from "./features/user/PrivateUserPage";

// TODO tried to dynamically import PrivateUserPage in useEffect didn't word since it either got imported on every page render or were set to null on second render

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/privatePage"}>
          <PrivateUserPage />
        </Route>
        <Route path={"/"}>
          <Login />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
