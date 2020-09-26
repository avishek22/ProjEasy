import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import materialize from "materialize-css";
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [nomembers, setNomembers] = useState(0);
  const newteam = useRef(null);
  const [subtask, setSubtask] = useState("");
  const [team, setTeam] = useState("");
  const history = useHistory();
  const [showsub, setShowsub] = useState([]);
  const newsubtask = useRef();
  const editsubtaskmodal = useRef();
  const [editsubtask, setEditSubtask] = useState("");
  const [editteam, setEditTeam] = useState("");
  useEffect(() => {
    // materialize.Modal.init(newsubtask.current);
    fetch("http://localhost:4000/allsubtask", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        projectid: localStorage.getItem("project"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setShowsub(result.Subtask);
        //console.log(result.team.teamname);
        //setNomembers(result.team.members.length);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    materialize.Modal.init(newsubtask.current);
    materialize.Modal.init(editsubtaskmodal.current);
    fetch("http://localhost:4000/allteam", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setData(result.team);
        //console.log(result.team.teamname);
        //setNomembers(result.team.members.length);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const editmainSubtask = () => {
    console.log(editteam);
    fetch("http://localhost:4000/editsubtask", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },

      body: JSON.stringify({
        title: editsubtask,
        teamid: editteam,
        editsubtaskid: localStorage.getItem("editsubtaskid"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return Swal.fire("Error!", result.error, "error");
        }
        Swal.fire("Posted!", "Subtask Posted", "success");
        // setLoading(true);
        // localStorage.setItem("newteam", result.team._id);
        // localStorage.setItem("newteamname", result.team.teamname);
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newSubtask = () => {
    console.log(team);
    fetch("http://localhost:4000/newsubtask", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },

      body: JSON.stringify({
        title: subtask,
        teamid: team,
        projectid: localStorage.getItem("project"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return Swal.fire("Error!", result.error, "error");
        }
        Swal.fire("Posted!", "Subtask Posted", "success");
        // setLoading(true);
        // localStorage.setItem("newteam", result.team._id);
        // localStorage.setItem("newteamname", result.team.teamname);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <button
        style={{ margin: "2%" }}
        className="btn waves-effect waves-light  modal-trigger"
        data-target="modal5"
      >
        Add subtask
      </button>
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
        {showsub.map((item) => {
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
                  data-target="modal9"
                  style={{ margin: "5%", cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("editsubtaskid", item._id);
                    localStorage.setItem("editsubtaskteamname", item.teamname);
                    localStorage.setItem("editsubtaskname", item.name);
                  }}
                >
                  edit
                </i>
                <i
                  className="material-icons"
                  style={{ margin: "5%", cursor: "pointer" }}
                  onClick={() => {
                    //deleteTeam(item._id);
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
              >
                <div style={{ marginRight: "2%" }}>
                  <label>Subtask</label>
                  <h2 style={{ marginTop: "0", marginRight: "2%" }}>
                    {item.title}
                  </h2>
                </div>
                <div style={{ marginRight: "2%" }}>
                  <label>Team</label>
                  <h2 style={{ marginTop: "0", marginRight: "2%" }}>
                    {item.team.teamname}
                    {console.log(item.teamname)}
                  </h2>
                </div>
                <div style={{ marginRight: "2%" }}>
                  <label>Status</label>
                  <p style={{ marginTop: "0", marginRight: "2%" }}>
                    {item.status}
                    {console.log(item.teamname)}
                  </p>
                </div>
                {/* <div>
                  <label>Number of members</label>
                  <h2 style={{ marginTop: "0" }}>
                    <strong>{nomembers}</strong>
                  </h2>
                </div> */}
              </Link>
            </div>
          );
        })}
      </div>
      ;
      <div id="modal5" className="modal profile " ref={newsubtask}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>Subtask</h4>

          <input
            type="text"
            placeholder="Subtask"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={subtask}
            onChange={(e) => {
              setSubtask(e.target.value);
            }}
          ></input>

          <select
            style={{
              border: "1px solid gray",
              borderRadius: 2,
              display: "block",
              backgroundColor: "#F9F9F9",
            }}
            value={team}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              //materialize.Modal.getInstance(newproject.current).open();
              setTeam(e.target.value);
              console.log(team);
            }}
          >
            <option disabled value="">
              Choose one
            </option>
            {data.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.teamname}
                </option>
              );
            })}
          </select>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              newSubtask();

              //   setTitle("");
              //   setLeader("");
            }}
          >
            Post
          </button>
        </div>
      </div>
      <div id="modal9" className="modal profile " ref={editsubtaskmodal}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>Subtask</h4>

          <input
            type="text"
            placeholder="Subtask"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={editsubtask}
            onChange={(e) => {
              setEditSubtask(e.target.value);
              console.log(e.target.value);
            }}
          ></input>

          <select
            style={{
              border: "1px solid gray",
              borderRadius: 2,
              display: "block",
              backgroundColor: "#F9F9F9",
            }}
            value={editteam}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              //materialize.Modal.getInstance(newproject.current).open();
              setEditTeam(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option disabled value="">
              Choose one
            </option>
            {data.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.teamname}
                </option>
              );
            })}
          </select>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              editmainSubtask();

              //   setTitle("");
              //   setLeader("");
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
