import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import materialize from "materialize-css";
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = useState([]);
  const [datalead, setDataLead] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const editmainproject = useRef();
  const [title, setTitle] = useState("");
  const [leader, setLeader] = useState("");
  const click = () => {
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

        setDataLead(result.lead);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    materialize.Modal.init(editmainproject.current);
    fetch("http://localhost:4000/allproject", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setData(result.project);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const newProject = (id) => {
    fetch("http://localhost:4000/editproject", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        leader: id,
        projectid: localStorage.getItem("editmainprojectid"),
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

  const delProject = () => {
    fetch("http://localhost:4000/deleteproject", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        projectid: localStorage.getItem("editmainprojectid"),
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
    <div>
      {loading ? (
        ""
      ) : (
        <div style={{ marginLeft: "45%", marginTop: "20%" }}>
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

      <div>
        {data.map((item) => {
          return (
            <div
              className="likes card home-card input-field navfix"
              style={{
                padding: "5% 2% 2% 2%",
                display: "inline-block",
                margin: "2%",
                width: "345px",
                height: "500px",
              }}
            >
              <div style={{ display: "flex", float: "right" }}>
                <i
                  className="material-icons  modal-trigger"
                  data-target="modal10"
                  style={{ margin: "5%", cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("editmainprojectid", item._id);
                    localStorage.setItem(
                      "editmainprojectteamname",
                      item.teamname
                    );
                    localStorage.setItem("editmainprojectname", item.name);
                    click();
                  }}
                >
                  edit
                </i>
                <i
                  className="material-icons"
                  style={{ margin: "5%", cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("editmainprojectid", item._id);
                    localStorage.setItem(
                      "editmainprojectteamname",
                      item.teamname
                    );
                    localStorage.setItem("editmainprojectname", item.name);
                    delProject();
                  }}
                >
                  delete
                </i>
              </div>
              <Link
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  margin: "0%",
                }}
                key={item._id}
                onClick={() => {
                  localStorage.setItem("project", item._id);
                }}
                to="/manager/subtask"
              >
                <div style={{ marginRight: "2%" }}>
                  <label>Project Name</label>
                  <h2 style={{ marginTop: "0", marginRight: "2%" }}>
                    {item.Title}
                  </h2>
                </div>
                <div>
                  <label>Leader</label>
                  <h2 style={{ marginTop: "0" }}>
                    <strong>{item.Leader.name}</strong>
                  </h2>
                </div>
                <div>
                  <label>Status</label>
                  <p>
                    <strong>{item.Status}</strong>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div id="modal10" className="modal profile " ref={editmainproject}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>New Project</h4>

          {/* <input
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
          ></input> */}
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
            {datalead.map((item) => {
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
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
