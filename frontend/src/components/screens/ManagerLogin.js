import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let a = 0,
    c = 0;

  const postData = () => {
    fetch("http://localhost:4000/loginadmin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.admin));
            localStorage.setItem("email", JSON.stringify(data.admin.email));
            dispatch({ type: "USER", payload: data.admin });
            localStorage.setItem("_id", data.admin._id);
            // console.log(state.email);
            history.push("/manager");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => postData()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
