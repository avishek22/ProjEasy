import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Aboutus = () => {
  return (
    <section style={{ padding: " 0 3%" }}>
      <h2 className="center-align">About Us</h2>
      <div className="row">
        <div className="col s4 m4 l4 offset-l4"></div>
      </div>

      <div className="row">
        <div className="col m6 s12 ">
          <img
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"
            className="responsive-img"
            style={{ width: 500 }}
          />
        </div>
        <div className="col m6 s12 ">
          <h4>It all started with the idea of Code Fellas! </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quas
            fugit excepturi unde soluta. Saepe, adipisci fugit deserunt earum
            voluptates tempora maxime. Eum placeat nemo autem ullam praesentium
            eius non neque. Corrupti consectetur iste quo accusantium, animi
            mollitia vero! Nihil
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col m6 s12 ">
          <h4>What we do?</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quas
            fugit excepturi unde soluta. Saepe, adipisci fugit deserunt earum
            voluptates tempora maxime. Eum placeat nemo autem ullam praesentium
            eius non neque. Corrupti consectetur iste quo accusantium, animi
            mollitia vero! Nihil
          </p>
        </div>
        <div className="col m6 s12 ">
          <img
            src="https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80"
            className="responsive-img"
            style={{ width: 500 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
