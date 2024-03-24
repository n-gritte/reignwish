import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaGamepad } from "react-icons/fa6";
import { IoLibrary } from "react-icons/io5";
import './Nav.scss';

const Nav = (props) => {
  const checkIsactive = ({ isActive }) => {
    return {
      display: "block",
      margin: "1rem 0",
      color: isActive ? "orange" : "",
    };
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink style={checkIsactive} to="/">
            <IoMdHome />
          </NavLink>
        </li>
        <li>
          <NavLink style={checkIsactive} to="/Profile">
            <RiLoginCircleLine />
          </NavLink>
        </li>
        <li>
          <NavLink style={checkIsactive} to="/Game">
            <FaGamepad />
          </NavLink>
        </li>
        <li>
          <NavLink style={checkIsactive} to="/Bibliography">
            <IoLibrary />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;