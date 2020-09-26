import React, {
  PureComponent,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import materialize from "materialize-css";
import Swal from "sweetalert2";

const Navbar = () => {
  const newproject = useRef(null);
  const resourcelogin = useRef(null);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [leader, setLeader] = useState("");

  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return (
    <nav>
      <div className="nav-wrapper grey darken-3">
        <Link
          to="/resource"
          className="brand-logo left"
          style={{ paddingLeft: "1%" }}
        >
          <img
            src="http://res.cloudinary.com/avishek/image/upload/v1600947404/jeatgirktjfmksehgnlb.png"
            style={{ height: "6%", width: "6%" }}
          ></img>
        </Link>

        <ul
          className="right
               "
        >
          <li>
            <Link to="/resource/request">Request Project</Link>
          </li>
          <li>
            <Link to="/resource/change">Change Project</Link>
          </li>
          {
            <Link
              className="waves-effect waves-light red btn "
              onClick={() => {
                localStorage.clear();

                history.push("/");
              }}
            >
              Logout
            </Link>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
