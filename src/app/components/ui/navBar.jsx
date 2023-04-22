import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/logo__status-active.png";
import { getIsLoggedIn } from "../../store/user";
import NavProfile from "./navProfile";

function NavBar() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <ul className="nav d-flex flex-nowrap">
      <li className="nav-brand d-flex justify-content-center align-items-center mx-1">
        <Link to="/" className="d-flex">
          <img src={logo} alt="Logo" width="100" className="d-flex"></img>
        </Link>
      </li>
      <li className="nav-link d-flex justify-content-center align-items-center mx-1">
        <Link to="/d3tree" className="nav-link">Дерево D3</Link>
      </li>
      {/* <li className="d-flex justify-content-center align-items-center ms-auto">
        { isLoggedIn ? (
          <NavProfile />
        ) : (
          <Link to="/login" className="nav-link">Войти</Link>
        )}
      </li> */}
    </ul>
  );
}

export default NavBar;
