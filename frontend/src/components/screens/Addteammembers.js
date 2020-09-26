import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [member, setMember] = useState("");
  const [data, setData] = useState([]);

  let a = 0,
    c = 0;

  useEffect(() => {
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

        setData(result.resource);
        //setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const postData = (id) => {
    fetch("http://localhost:4000/addmembers", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        teamid: localStorage.getItem("newteam"),
        memberid: id,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            Swal.fire("Added", "Member Added", "success");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Add members to {localStorage.getItem("newteamname")}</h2>
          <div style={{ display: "flex" }}>
            <select
              style={{
                border: "1px solid gray",
                borderRadius: 2,
                display: "block",
                backgroundColor: "#F9F9F9",
                width: "60%",
              }}
              value={member}
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                //materialize.Modal.getInstance(newproject.current).open();
                setMember(e.target.value);
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
              className="btn waves-effect waves-light  "
              style={{ width: "30%" }}
              onClick={() => postData(member)}
            >
              Add
            </button>
          </div>

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => history.push("/lead/team")}
          >
            Save Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
