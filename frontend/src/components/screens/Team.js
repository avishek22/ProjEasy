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
  const edittteamname = useRef(null);
  const [teamname, setTeamname] = useState("");
  const [editteamname, setEditTeamname] = useState("");
  const history = useHistory();
  useEffect(() => {
    materialize.Modal.init(newteam.current);
    materialize.Modal.init(edittteamname.current);
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
        console.log(result.team.teamname);
        //setNomembers(result.team.members.length);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const newTeam = () => {
    fetch("http://localhost:4000/newteam", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamname: teamname,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return Swal.fire("Error!", result.error, "error");
        }
        Swal.fire("Added!", "Add Members", "success");
        // setLoading(true);
        localStorage.setItem("newteam", result.team._id);
        localStorage.setItem("newteamname", result.team.teamname);
        //window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editTeam = () => {
    console.log(editteamname);
    fetch("http://localhost:4000/editteamname", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamname: editteamname,
        teamid: localStorage.getItem("editteamid"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return Swal.fire("Error!", result.error, "error");
        }
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTeam = (id) => {
    console.log(id);
    fetch("http://localhost:4000/deleteteam", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamid: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          return Swal.fire("Error!", result.error, "error");
        }
        //Swal.fire("Posted!", "Project Posted", "success");
        // setLoading(true);

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
        data-target="modal4"
      >
        Add team
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
        {data.map((item) => {
          return (
            <div
              className="likes card home-card input-field navfix"
              style={{
                padding: "5% 2% 2% 2%",
                display: "inline-block",
                margin: "2%",
                width: "345px",
                height: "300px",
              }}
            >
              <div style={{ display: "flex", float: "right" }}>
                <i
                  className="material-icons  modal-trigger"
                  data-target="modal7"
                  style={{ margin: "5%", cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("editteamid", item._id);
                    localStorage.setItem("editteamname", item.teamname);
                  }}
                >
                  edit
                </i>
                <i
                  className="material-icons"
                  style={{ margin: "5%", cursor: "pointer" }}
                  onClick={() => {
                    deleteTeam(item._id);
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
                  localStorage.setItem("selectteamid", item._id);
                }}
                to="/lead/allteammembers"
              >
                <div style={{ marginRight: "2%" }}>
                  <label>Team Name</label>
                  <h2 style={{ marginTop: "0", marginRight: "2%" }}>
                    {item.teamname}
                  </h2>
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
      <div id="modal4" className="modal profile " ref={newteam}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>New Team</h4>

          <input
            type="text"
            placeholder="Team Name"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={teamname}
            onChange={(e) => {
              setTeamname(e.target.value);
            }}
          ></input>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              newTeam();
              materialize.Modal.getInstance(newteam.current).close();
              history.push("/lead/addmembers");
              //   setTitle("");
              //   setLeader("");
            }}
          >
            Post
          </button>
        </div>
      </div>
      <div id="modal7" className="modal profile " ref={edittteamname}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>Edit Team</h4>

          <input
            type="text"
            placeholder="Team Name"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={editteamname}
            onChange={(e) => {
              setEditTeamname(e.target.value);
            }}
          ></input>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              editTeam();
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
