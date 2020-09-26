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
    fetch("http://localhost:4000/particularteam", {
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

  useEffect(() => {
    materialize.Modal.init(newmember.current);
    fetch("http://localhost:4000/allresource", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setResource(result.resource);
        //setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteMember = (id) => {
    fetch("http://localhost:4000/removeteammember", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamid: localStorage.getItem("selectteamid"),
        _id: id,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = (id) => {
    fetch("http://localhost:4000/addmembers", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamid: localStorage.getItem("selectteamid"),
        memberid: id,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        style={{ margin: "2%" }}
        className="btn waves-effect waves-light  modal-trigger"
        data-target="modal6"
      >
        Add Member
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
                  <i
                    className="material-icons"
                    style={{ float: "right", cursor: "pointer" }}
                    onClick={() => {
                      deleteMember(option._id);
                    }}
                  >
                    delete
                  </i>
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
      <div id="modal6" className="modal profile " ref={newmember}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>Add Member</h4>

          <label>Member</label>
          <select
            style={{
              border: "1px solid gray",
              borderRadius: 2,
              display: "block",
              backgroundColor: "#F9F9F9",
            }}
            value={mainresource}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              //materialize.Modal.getInstance(newproject.current).open();
              setMainResource(e.target.value);
            }}
          >
            <option disabled value="">
              Choose one
            </option>
            {resource.map((item) => {
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
              postData(mainresource);
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
