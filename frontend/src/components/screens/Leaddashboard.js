import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import materialize from "materialize-css";
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [editstatus, setEditStatus] = useState("");
  const editstatusmodal = useRef();
  useEffect(() => {
    materialize.Modal.init(editstatusmodal.current);
    fetch("http://localhost:4000/showleadproject", {
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

  const editstatusmain = () => {
    fetch("http://localhost:4000/editprojectstatus", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        projectid: localStorage.getItem("editprojectid"),
        status: editstatus,
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
      <div>
        <p style={{ margin: "2%" }}>
          Welcome, Lead {localStorage.getItem("name")}
        </p>
      </div>
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
              <i
                className="material-icons  modal-trigger"
                data-target="modal8"
                style={{ margin: "5%", cursor: "pointer", float: "right" }}
                onClick={() => {
                  localStorage.setItem("editprojectid", item._id);
                }}
              >
                edit
              </i>
              <Link
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  margin: "0%",
                }}
                key={item._id}
                to="/lead/subtask"
                onClick={() => {
                  localStorage.setItem("project", item._id);
                }}
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
      <div id="modal8" className="modal profile " ref={editstatusmodal}>
        <div className="modal-content" style={{ padding: "10% 30%" }}>
          <h4 style={{ textAlign: "center", color: "black" }}>Add Member</h4>

          <label>Status</label>
          <select
            style={{
              border: "1px solid gray",
              borderRadius: 2,
              display: "block",
              backgroundColor: "#F9F9F9",
            }}
            value={editstatus}
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              //materialize.Modal.getInstance(newproject.current).open();
              setEditStatus(e.target.value);
            }}
          >
            <option disabled value="">
              Choose one
            </option>

            <option value="Completed">Completed</option>
            <option value="On progress">On Progress</option>
            <option value="Backlog">Backlog</option>
          </select>
          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => {
              editstatusmain();
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
