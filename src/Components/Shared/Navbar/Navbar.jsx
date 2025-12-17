import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from "../Logo/Logo";
import Swal from "sweetalert2";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  /* Scroll shadow effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed out successfully",
          text: "We hope to see you again soon ❤️",
          timer: 2200,
          showConfirmButton: false,
        });
      })
      .catch(console.log);
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 shadow bg-red-200/5
        ${scrolled ? "shadow-xl backdrop-blur-xl" : "backdrop-blur-md "}`}
    >
      <div className="navbar max-w-7xl mx-auto px-4 text-black">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-black">
              <HiMenuAlt3 size={24} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl
              bg-white/90 backdrop-blur-xl text-red-600 shadow-lg"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <div className=" text-xl ">
            <Logo />
          </div>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex text-primary font-medium">
          <ul className="menu menu-horizontal gap-2 ">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Avatar with username tooltip */}
              <div
                tabIndex={0}
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName || "User"}
              >
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ring-2 ring-white/80
                  cursor-pointer hover:scale-105 transition"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl
                bg-white/90 backdrop-blur-xl text-red-600 shadow-lg"
              >
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-semibold text-red-600"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn hover:bg-primary hover:text-white bg-white text-primary border-primary shadow-primary"
            >
              <IoLogIn />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
