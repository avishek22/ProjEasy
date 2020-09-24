import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Signuplead = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div className="loader">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>

            <div className="spinner-layer spinner-red">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>

            <div className="spinner-layer spinner-yellow">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>

            <div className="spinner-layer spinner-green">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Code Fellas</h2>
          <p>Lead Signup</p>

          <input
            type="text"
            placeholder="Full Name"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
          ></input>
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
          <input
            type="password"
            placeholder="Confirm Password"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
          ></input>
          <button className="btn waves-effect waves-light btn-block login ">
            Signup
          </button>
          <p style={{ color: "gray" }}>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
      </div>
      <div className="mycard">
        <div className="card auth-card ">
          <h7>Have an account? </h7>
          <Link to="/" className="signuplink">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signuplead;
