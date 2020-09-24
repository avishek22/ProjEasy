import React, {
  PureComponent,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import materialize from "materialize-css";

const Navbar = () => {
  const leadlogin = useRef(null);
  const resourcelogin = useRef(null);
  useEffect(() => {
    materialize.Modal.init(leadlogin.current);
    materialize.Modal.init(resourcelogin.current);
  });
  return (
    <nav>
      <div class="nav-wrapper grey darken-3">
        <Link to="/" className="brand-logo left" style={{ paddingLeft: "1%" }}>
          Code Fellas
        </Link>

        <ul
          class="right
         "
        >
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <Link
            class="waves-effect waves-light btn modal-trigger"
            data-target="modal1"
          >
            Login as Lead
          </Link>
          <Link
            class="waves-effect waves-light btn modal-trigger"
            data-target="modal2"
          >
            Login as Resource
          </Link>
        </ul>
      </div>
      <div
        id="modal1"
        className="modal profile "
        style={{ width: "30%" }}
        ref={leadlogin}
      >
        <div className="modal-content">
          <h4 style={{ textAlign: "center", color: "black" }}>Lead Login</h4>
          <input
            type="text"
            placeholder="E-mail"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
          ></input>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
          >
            Login
          </button>
          <h7 style={{ color: "black", marginLeft: "25%" }}>
            Don't have an account?
          </h7>
          <Link to="/leadsignup" style={{ color: "black", marginLeft: "1%" }}>
            Signup
          </Link>
        </div>
      </div>
      <div
        id="modal2"
        className="modal profile "
        ref={resourcelogin}
        style={{ width: "30%" }}
      >
        <div className="modal-content">
          {" "}
          <h4 style={{ textAlign: "center", color: "black" }}>
            Resource Login
          </h4>
          <input
            type="text"
            placeholder="E-mail"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
          ></input>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
          >
            Login
          </button>
          <h7 style={{ color: "black", marginLeft: "25%" }}>
            Don't have an account?
          </h7>
          <Link
            to="/resourcesignup"
            style={{ color: "black", marginLeft: "1%" }}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
