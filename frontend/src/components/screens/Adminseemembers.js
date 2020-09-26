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
  const newmember = useRef(null);
  const [teamname, setTeamname] = useState("");
  const history = useHistory();
  const [resource, setResource] = useState([]);
  const [mainresource, setMainResource] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/adminparticularteam", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamid: localStorage.getItem("selectteamid"),
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setData(data.team);
        });
      })
      .catch((err) => {
        console.log(err);
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
        {data.map((item) => {
          return (
            <div>
              {item.members.map((option) => (
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
                  <div>
                    <Link
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        margin: "0%",
                      }}
                      key={option._id}
                    >
                      <div style={{ marginRight: "2%" }}>
                        <label>Team Member</label>
                        <h2 style={{ marginTop: "0", marginRight: "2%" }}>
                          {option.name}
                        </h2>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
