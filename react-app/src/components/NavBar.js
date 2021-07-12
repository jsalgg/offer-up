import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";
import "../styles/output.css";
const NavBar = () => {
  const user = useSelector((store) => store.session.user);
  if (user) {
    return (
      <nav className="flex flex-wrap items-center justify-between p-5 ">
        <NavLink
          to="/"
          exact={true}
          activeClassName="active"
          className="text-green-500 font-bold text-lg"
        >
          OfferDown
        </NavLink>

        <NavLink to="/item/new" className="text-green-500">
          Sell an Item
        </NavLink>

        <NavLink to="/item/all" className="text-green-500">
          View all Items
        </NavLink>

        <LogoutButton />
      </nav>
    );
  } else {
    return (
      <nav>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>

        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </nav>
    );
  }
};

export default NavBar;
