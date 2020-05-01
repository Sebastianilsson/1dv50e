import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./features/user/Login";
let PrivateUserPage = null;

function App() {
  useEffect(() => {
    import("./features/user/PrivateUserPage").then((component) => {
      PrivateUserPage = component;
    });
  }, []);
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
