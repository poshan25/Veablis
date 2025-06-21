import React from "react";
import { Link } from "react-router-dom";

const Nav = ({cartLength}) => {
  return (
    <nav className="flex border p-5 m-5 justify-around rounded-lg bg-emerald-300 text-gray-700 font-semibold">
      <Link to="/">Home</Link>
      <br />
      <Link to="/admin">Admin</Link>
      <br />
      <Link to="/user">User</Link>
      <br />
      <Link to="/vieworder">View Order</Link>
    </nav>
  );
};

export default Nav;
