import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Span = (props) => {
  return (
    <span
      style={{
        margin: 0,
        fontSize: 100,
        marginTop: props.margin,
        display: "inline-block",
      }}
      className="landingtext"
    >
      {props.letter}
    </span>
  );
};

export default Span;
