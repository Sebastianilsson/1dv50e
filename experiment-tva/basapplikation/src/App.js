import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./features/user/Login";
import PrivateUserPage from "./features/user/PrivateUserPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Login />
        </Route>
        <Route exact path={"/privatePage"}>
          <PrivateUserPage />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
