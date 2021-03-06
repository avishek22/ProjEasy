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
    fetch("http://localhost:4000/adminallsubtask", {
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
                height: "500px",
              }}
            >
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
    </div>
  );
};

export default Home;
