import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from "../Logo/Logo";
import Swal from "sweetalert2";
import {
  IoLogIn,
  IoLogOut,
  IoSearch,
  IoWater,
  IoHome,
  IoWallet,
  IoGrid,
  IoChevronDown,
} from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

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
          title: "Signed out",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch(console.log);
  };

  // Sophisticated NavLink styling
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-semibold tracking-wide
    ${
      isActive
        ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
        : "text-slate-200 hover:text-white hover:bg-white/10"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClasses}>
          <IoHome size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search-donors" className={navLinkClasses}>
          <IoSearch size={18} /> Search Donors
        </NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests" className={navLinkClasses}>
          <IoWater size={18} /> Requests
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/funding" className={navLinkClasses}>
            <IoWallet size={18} /> Funding
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 w-full z-[100] px-4 sm:px-8 py-4 pointer-events-none">
      <header
        className={`max-w-7xl mx-auto pointer-events-auto transition-all duration-500 rounded-[2rem] border 
          ${
            scrolled
              ? "bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl py-2"
              : "bg-slate-900/80 backdrop-blur-md border-white/10 py-2"
          }`}
      >
        <div className="navbar px-6 lg:px-8">
          {/* Mobile Menu Trigger */}
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label
                tabIndex={0}
                className="btn btn-ghost p-0 mr-4 text-white hover:bg-transparent"
              >
                <HiMenuAlt3 size={28} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 w-72 p-4 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-2"
              >
                {links}
              </ul>
            </div>
            <Logo />
          </div>

          {/* Desktop Center Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-2">{links}</ul>
          </div>

          {/* User Section */}
          <div className="navbar-end gap-4">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="flex items-center gap-3 cursor-pointer group bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-full transition-all border border-white/5"
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border border-red-500/50"
                  />
                  <IoChevronDown className="text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-4 w-60 p-3 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden"
                >
                  <div className="px-4 py-3 mb-2 border-b border-slate-800">
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                      Signed in as
                    </p>
                    <p className="text-white font-bold truncate text-sm">
                      {user?.displayName || "Member"}
                    </p>
                  </div>

                  <li>
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-3 py-3 text-slate-300 hover:text-white rounded-xl"
                    >
                      <IoGrid size={18} /> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 font-bold mt-1 rounded-xl"
                    >
                      <IoLogOut size={20} /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="group flex items-center gap-2 px-7 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 active:scale-95"
              >
                <IoLogIn size={20} />
                <span className="text-sm">Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
