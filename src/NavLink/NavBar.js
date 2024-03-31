import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

const NavLinks = () => {
  return (
    <div className="container-link">
      <div className="nav-link">
        <div>
          <NavLink
            to="/"
            caseSensitive
            className={({ isActive }) => (isActive ? "isActive" : "static")}
          >
            Swap items in list
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/shuffle"
            caseSensitive
            className={({ isActive }) => (isActive ? "isActive" : "static")}
          >
            Shuffle Array items 
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/amount"
            caseSensitive
            className={({ isActive }) => (isActive ? "isActive" : "static")}
          >
            Total Count 
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
