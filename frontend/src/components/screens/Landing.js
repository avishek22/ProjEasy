import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";
import Span from "./Span";

const Landing = () => {
  return (
    <section
      className="landing"
      style={{ height: "800px", textAlign: "center" }}
    >
      <Span letter="W" margin="10%"></Span>
      <Span letter="e"></Span>
      <Span letter="l"></Span>
      <Span letter="c"></Span>
      <Span letter="o"></Span>
      <Span letter="m"></Span>
      <Span letter="e"></Span>
      <br></br>
      <Span letter="T"></Span>
      <Span letter="o"></Span>
      <br></br>
      <Span letter="C"></Span>
      <Span letter="o"></Span>
      <Span letter="d"></Span>
      <Span letter="e"></Span>
      <Span letter="F"></Span>
      <Span letter="e"></Span>
      <Span letter="l"></Span>
      <Span letter="l"></Span>
      <Span letter="a"></Span>
      <Span letter="s"></Span>
    </section>
  );
};

export default Landing;
