import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import { reducer, initialState } from "./reducer/userReducer";
import Navbar from "./components/Navbar";
import Signuplead from "./components/screens/Signuplead";
import Signupresource from "./components/screens/Signupresource";
import ManagerLogin from "./components/screens/ManagerLogin";
import Managernavbar from "./components/Managernavbar";
import Leadnavbar from "./components/Leadnavbar";
import Resourcenavbar from "./components/Resourcenavbar";
import Aboutus from "./components/screens/Aboutus";
import Landing from "./components/screens/Landing";
import Footer from "./components/screens/Footer";
import Navbarnormal from "./components/Navbarnormal";
import Managerdashboard from "./components/screens/Managerdashboard";
import Leaddashboard from "./components/screens/Leaddashboard";
import Team from "./components/screens/Team";
import Addteammembers from "./components/screens/Addteammembers";
import Seeteammembers from "./components/screens/Seeteammembers";
import Subtask from "./components/screens/Subtask";
import Resourcedashboard from "./components/screens/Resourcedashboard";
import Resourcesubtask from "./components/screens/Resourcesubtask";
import Adminallteams from "./components/screens/Adminallteams";
import Adminsubtask from "./components/screens/Adminsubtask";
import Adminseemembers from "./components/screens/Adminseemembers";

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
        <Landing></Landing>
        <Footer></Footer>
      </Route>
      <Route exact path="/aboutus">
        <Navbarnormal></Navbarnormal>
        <Aboutus></Aboutus>
        <Footer></Footer>
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
      <Route exact path="/manager">
        <Managernavbar></Managernavbar>
        <Managerdashboard></Managerdashboard>
      </Route>
      <Route exact path="/lead">
        <Leadnavbar></Leadnavbar>
        <Leaddashboard></Leaddashboard>
      </Route>
      <Route exact path="/lead/team">
        <Leadnavbar></Leadnavbar>
        <Team></Team>
      </Route>
      <Route exact path="/lead/addmembers">
        <Leadnavbar></Leadnavbar>
        <Addteammembers></Addteammembers>
      </Route>
      <Route exact path="/lead/allteammembers">
        <Leadnavbar></Leadnavbar>
        <Seeteammembers></Seeteammembers>
      </Route>
      <Route exact path="/lead/subtask">
        <Leadnavbar></Leadnavbar>
        <Subtask></Subtask>
      </Route>
      <Route exact path="/resource">
        <Resourcenavbar></Resourcenavbar>
        <Resourcedashboard></Resourcedashboard>
      </Route>
      <Route exact path="/resource/subtask">
        <Resourcenavbar></Resourcenavbar>
        <Resourcesubtask></Resourcesubtask>
      </Route>
      <Route exact path="/manager/allteam">
        <Managernavbar></Managernavbar>
        <Adminallteams></Adminallteams>
      </Route>
      <Route exact path="/manager/subtask">
        <Managernavbar></Managernavbar>
        <Adminsubtask></Adminsubtask>
      </Route>
      <Route exact path="/manager/teammember">
        <Managernavbar></Managernavbar>
        <Adminseemembers></Adminseemembers>
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
