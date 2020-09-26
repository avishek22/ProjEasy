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
import Swal from "sweetalert2";

const Navbar = () => {
  const leadlogin = useRef(null);
  const resourcelogin = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remail, setREmail] = useState("");
  const [rpassword, setRPassword] = useState("");

  const [show, handleShow] = useState("transparent");
  useEffect(() => {
    materialize.Modal.init(leadlogin.current);
    materialize.Modal.init(resourcelogin.current);
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow("black");
      } else {
        handleShow("transparent");
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  const postDatalead = () => {
    fetch("http://localhost:4000/loginlead", {
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
            localStorage.setItem("user", JSON.stringify(data.Lead));
            localStorage.setItem("email", JSON.stringify(data.Lead.email));
            dispatch({ type: "USER", payload: data.Lead });
            localStorage.setItem("_id", data.Lead._id);
            localStorage.setItem("name", data.Lead.name);
            // console.log(state.email);
            history.push("/lead");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postDataresource = () => {
    fetch("http://localhost:4000/loginresource", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: rpassword,
        email: remail,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.Resource));
            localStorage.setItem("email", JSON.stringify(data.Resource.email));
            dispatch({ type: "USER", payload: data.Resource });
            localStorage.setItem("_id", data.Resource._id);
            localStorage.setItem("name", data.Resource.name);
            // console.log(state.email);
            history.push("/resource");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav style={{ backgroundColor: show, position: "fixed", zIndex: 1 }}>
      <div className="nav-wrapper transparent darken-3">
        <Link to="/" className="brand-logo left" style={{ paddingLeft: "1%" }}>
          <img
            src="http://res.cloudinary.com/avishek/image/upload/v1600947404/jeatgirktjfmksehgnlb.png"
            style={{ height: "6%", width: "6%" }}
          ></img>
        </Link>

        <ul
          className="right
         "
        >
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link
              className="waves-effect waves-light  modal-trigger"
              data-target="modal1"
            >
              Login as Lead
            </Link>
          </li>
          <li>
            {" "}
            <Link
              className="waves-effect waves-light  modal-trigger"
              data-target="modal2"
            >
              Login as Resource
            </Link>
          </li>
        </ul>
      </div>
      <div id="modal1" className="modal profile " ref={leadlogin}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>Lead Login</h4>
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
              console.log(e.target.value);
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
              console.log(e.target.value);
            }}
          ></input>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              postDatalead();
            }}
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
      <div id="modal2" className="modal profile " ref={resourcelogin}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
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
            value={remail}
            onChange={(e) => {
              setREmail(e.target.value);
              console.log(e.target.value);
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
            value={rpassword}
            onChange={(e) => {
              setRPassword(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              postDataresource();
            }}
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
