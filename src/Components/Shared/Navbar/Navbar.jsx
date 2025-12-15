import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        alert("Logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/search-donors">Search Donors</NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests">Donation Requests</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/funding">Funding</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-left">
            <img
              tabIndex={0}
              src={user?.photoURL}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </ul>
          </div>
        ) : (
          <>
            <FaUserCircle />{" "}
            <Link to="/auth/login" className="btn">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
