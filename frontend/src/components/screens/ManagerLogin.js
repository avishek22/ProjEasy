import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  let a = 0,
    c = 0;

  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Code Fellas</h2>
          <p>Manager Login</p>
          <input
            type="text"
            placeholder="E-mail"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            // value={email}
            // onChange={(e) => {
            //   setEmail(e.target.value);
            // }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            // value={email}
            // onChange={(e) => {
            //   setEmail(e.target.value);
            // }}
          ></input>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            // onClick={() => postData()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
