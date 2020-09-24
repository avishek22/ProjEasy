import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Footer = () => {
  return (
    <section>
      <footer class="page-footer" style={{ backgroundColor: "#4f504f" }}>
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h3 class="white-text">Code Fellas</h3>
              <p class="grey-text text-lighten-4">
                We are a team of college students working on this project like
                it's our full time job. Any amount would help support and
                continue development on this project and is greatly appreciated.
              </p>
            </div>
            <div class="col  l3 offset-l2 s12">
              <h5 class="white-text">Our Social Media</h5>
              <ul>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="https://www.instagram.com/"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="https://www.linkedin.com/"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="https://www.facebook.com/"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    class="grey-text text-lighten-3"
                    href="https://www.twitter.com/"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">2020©CodeFellas</div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
