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
</div>;
