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
  const newproject = useRef(null);
  const resourcelogin = useRef(null);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [leader, setLeader] = useState("");

  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    materialize.Modal.init(newproject.current);
    materialize.Modal.init(resourcelogin.current);
    fetch("http://localhost:4000/alllead", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setData(result.lead);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const newProject = (id) => {
    fetch("http://localhost:4000/newproject", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        Title: title,
        Leader: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return Swal.fire("Error!", result.error, "error");
        }
        Swal.fire("Posted!", "Project Posted", "success");
        setLoading(true);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper grey darken-3">
        <Link
          to="/manager"
          className="brand-logo left"
          style={{ paddingLeft: "1%" }}
        >
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
            <Link className="modal-trigger" data-target="modal3">
              New Project
            </Link>
          </li>
          <li>
            <Link>All Teams</Link>
          </li>
          {
            <Link
              className="waves-effect waves-light red btn "
              //   data-target="modal1"
              onClick={() => {
                localStorage.clear();
                //   dispatch({ type: "CLEAR" });
                history.push("/");
                //   materialize.Modal.getInstance(navs.current).close();
              }}
            >
              Logout
            </Link>
            /*<Link
              className="waves-effect waves-light btn modal-trigger"
              data-target="modal2"
            >
              Login as Resource
            </Link> */
          }
        </ul>
      </div>
      <div id="modal3" className="modal profile " ref={newproject}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>New Project</h4>

          <input
            type="text"
            placeholder="Title"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <label>Leader</label>
          <select
            style={{
              border: "1px solid gray",
              borderRadius: 2,
              display: "block",
              backgroundColor: "#F9F9F9",
            }}
            value={leader}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              //materialize.Modal.getInstance(newproject.current).open();
              setLeader(e.target.value);
            }}
          >
            <option disabled value="">
              Choose one
            </option>
            {data.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              newProject(leader);
              materialize.Modal.getInstance(newproject.current).close();
              setTitle("");
              setLeader("");
            }}
          >
            Post
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
