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
  const [status, setStatus] = useState("");
  const statuschange = useRef();
  useEffect(() => {
    materialize.Modal.init(statuschange.current);
    fetch("http://localhost:4000/mysubtask", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        myteam: localStorage.getItem("myteam"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setShowsub(result);
        //console.log(result.team.teamname);
        //setNomembers(result.team.members.length);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const editmainStatus = () => {
    console.log(team);
    fetch("http://localhost:4000/editsubtaskstatus", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },

      body: JSON.stringify({
        status: status,
        projectid: localStorage.getItem("editsubtaskid"),
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
        {showsub.map((item) => {
          return (
            <div
              className="likes card home-card input-field navfix"
              style={{
                padding: "5% 2% 2% 2%",
                display: "inline-block",
                margin: "2%",
                width: "345px",
                height: "300px",
                top: 0,
              }}
            >
              <i
                className="material-icons  modal-trigger"
                data-target="modal11"
                style={{ margin: "5%", cursor: "pointer" }}
                onClick={() => {
                  localStorage.setItem("editsubtaskid", item._id);
                }}
                style={{ float: "right" }}
              >
                edit
              </i>
              {item.Subtask.map((option) => (
                <Link
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    margin: "0%",
                  }}
                  className="modal-trigger"
                  data-target="modal11"
                  onClick={() => {
                    localStorage.setItem("editsubtaskid", option._id);
                  }}
                  key={option._id}
                >
                  {option.team._id === localStorage.getItem("myteam") ? (
                    <div>
                      <div style={{ marginRight: "2%" }}>
                        <label>Subtask</label>
                        <h2 style={{ marginTop: "0", marginRight: "2%" }}>
                          {option.title}
                        </h2>
                      </div>
                      <div style={{ marginRight: "2%" }}>
                        <label>Status</label>
                        <p style={{ marginTop: "0", marginRight: "2%" }}>
                          {option.status}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
              ))}

              {/* <div>
                  <label>Number of members</label>
                  <h2 style={{ marginTop: "0" }}>
                    <strong>{nomembers}</strong>
                  </h2>
                </div> */}
            </div>
          );
        })}
      </div>
      ;
      <div id="modal11" className="modal profile " ref={statuschange}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          {" "}
          <input
            type="text"
            placeholder="Status"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              editmainStatus();
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
