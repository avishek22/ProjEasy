import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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

  //   const getLikes = (id) => {
  //     fetch("http://localhost:4000/getlikes", {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //       body: JSON.stringify({
  //         postId: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);

  //         setData(result.likes);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  //   const unlikePost = (id) => {
  //     fetch("http://localhost:4000/unlike", {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //       body: JSON.stringify({
  //         postId: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         const newData = data.map((item) => {
  //           if (item._id === result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setData(newData);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
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
                margin: "5%",

                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",

                  flexWrap: "wrap",
                }}
                key={item._id}
              >
                <Link
                  style={{
                    display: "flex",

                    margin: "3%",
                  }}
                >
                  <div>
                    <h2>{item.Title}</h2>
                  </div>
                  <h2
                    style={{
                      marginTop: "9%",
                      marginLeft: "25%",
                    }}
                  >
                    <strong>{item.Leader.name}</strong>
                  </h2>
                  <p
                    style={{
                      marginTop: "9%",
                      marginLeft: "25%",
                      fontSize: "25px",
                    }}
                  >
                    <strong>{item.Status}</strong>
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
