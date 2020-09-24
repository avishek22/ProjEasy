import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import { reducer, initialState } from "./reducer/userReducer";
import Navbar from "./components/Navbar";
import Signuplead from "./components/screens/Signuplead";
import Signupresource from "./components/screens/Signupresource";
import ManagerLogin from "./components/screens/ManagerLogin";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push("/home");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Navbar></Navbar>
      </Route>
      <Route exact path="/leadsignup">
        <Signuplead></Signuplead>
      </Route>
      <Route exact path="/resourcesignup">
        <Signupresource></Signupresource>
      </Route>
      <Route exact path="/managerlogin">
        <ManagerLogin></ManagerLogin>
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing></Routing>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
