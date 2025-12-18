import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { BiDonateBlood, BiSolidDonateBlood } from "react-icons/bi";
import { FaUser, FaHome, FaSlidersH } from "react-icons/fa";
import {
  HiMenuAlt2,
  HiChevronLeft,
  HiChevronRight,
  HiBell,
  HiSearch,
} from "react-icons/hi";
import useRole from "../Hooks/useRole";
import Logo from "../Components/Shared/Logo/Logo";

const DashboardLayout = () => {
  const { role } = useRole();
  const [isExpanded, setIsExpanded] = useState(true);

  const activeLink = "bg-red-600 text-white shadow-lg shadow-red-200";
  const normalLink =
    "text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300";

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col min-h-screen">
          {/* --- Main Content Header (Top Div Section) --- */}
          <header className="bg-white border-b border-slate-200 px-4 py-4 lg:px-8 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Toggle */}
                <label
                  htmlFor="my-drawer-4"
                  className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <HiMenuAlt2 size={24} />
                </label>
                <h2 className="hidden sm:block text-xl font-black text-slate-800 tracking-tighter uppercase">
                  Control <span className="text-red-600">Panel</span>
                </h2>
              </div>

              {/* Top Search & Actions */}
              <div className="flex items-center gap-3 md:gap-6">
                <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 group focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 transition-all">
                  <HiSearch className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className="bg-transparent border-none outline-none text-xs ml-2 w-40 font-medium"
                  />
                </div>

                <button className="relative p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <HiBell size={22} />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

                <div className="flex items-center gap-3 pl-1">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">
                      Status
                    </p>
                    <p className="text-xs font-bold text-green-600">
                      Active Now
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 border border-white shadow-sm flex items-center justify-center font-bold text-slate-600">
                    {role?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* --- Main Content Viewport --- */}
          <main className="flex-1 p-0 lg:p-4">
            <div className="bg-white lg:rounded-[2.5rem] min-h-[calc(100vh-120px)] shadow-sm border border-slate-200 overflow-hidden">
              <Outlet />
            </div>
          </main>
        </div>

        {/* --- Sidebar --- */}
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div
            className={`flex min-h-full flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out
            ${isExpanded ? "w-72" : "w-20"}`}
          >
            {/* Sidebar Branding & Toggle */}
            <div className="flex items-center justify-between p-4 mb-4 min-h-[80px]">
              <div
                className={`transition-all duration-300 ${
                  isExpanded
                    ? "opacity-100 scale-100 bg-slate-700 p-3 rounded-2xl"
                    : "opacity-0 scale-90 w-0 overflow-hidden"
                }`}
              >
                <Logo />
              </div>

              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-red-600 hover:text-white transition-all shadow-sm
                ${!isExpanded ? "mx-auto" : ""}`}
              >
                {isExpanded ? (
                  <HiChevronLeft size={22} />
                ) : (
                  <HiChevronRight size={22} />
                )}
              </button>
            </div>

            {/* Navigation Menu */}
            <ul className="menu w-full px-3 space-y-2 font-bold text-sm">
              <SidebarItem
                to="/dashboard"
                icon={<FaHome size={20} />}
                label="Homepage"
                expanded={isExpanded}
                activeLink={activeLink}
                normalLink={normalLink}
                end
              />
              <SidebarItem
                to="/dashboard/profile"
                icon={<CgProfile size={20} />}
                label="My Profile"
                expanded={isExpanded}
                activeLink={activeLink}
                normalLink={normalLink}
              />

              {role === "admin" && (
                <>
                  {isExpanded && (
                    <div className="pt-6 pb-2 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Admin
                    </div>
                  )}
                  <SidebarItem
                    to="/dashboard/all-users"
                    icon={<FaUser size={18} />}
                    label="All Users"
                    expanded={isExpanded}
                    activeLink={activeLink}
                    normalLink={normalLink}
                  />
                  <SidebarItem
                    to="/dashboard/all-blood-donation-request"
                    icon={<BiSolidDonateBlood size={22} />}
                    label="All Requests"
                    expanded={isExpanded}
                    activeLink={activeLink}
                    normalLink={normalLink}
                  />
                </>
              )}

              {role === "donor" && (
                <>
                  {isExpanded && (
                    <div className="pt-6 pb-2 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Donor
                    </div>
                  )}
                  <SidebarItem
                    to="/dashboard/my-donation-requests"
                    icon={<BiDonateBlood size={20} />}
                    label="My Requests"
                    expanded={isExpanded}
                    activeLink={activeLink}
                    normalLink={normalLink}
                  />
                  <SidebarItem
                    to="/dashboard/create-donation-request"
                    icon={<VscGitPullRequestNewChanges size={20} />}
                    label="New Request"
                    expanded={isExpanded}
                    activeLink={activeLink}
                    normalLink={normalLink}
                  />
                </>
              )}

              <div className="my-4 border-t border-slate-100"></div>

              <li>
                <button
                  className={`${normalLink} flex items-center h-12 rounded-xl px-0 w-full group relative`}
                >
                  <div className="min-w-[56px] flex justify-center group-hover:scale-110 transition-transform">
                    <FaSlidersH size={18} />
                  </div>
                  {isExpanded ? (
                    <span>Settings</span>
                  ) : (
                    <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      Settings
                    </span>
                  )}
                </button>
              </li>
            </ul>

            {/* Bottom Section */}
            <div className="mt-auto p-4">
              <div
                className={`bg-slate-900 rounded-[2rem] p-5 text-white transition-all duration-300 ${
                  isExpanded
                    ? "opacity-100"
                    : "opacity-0 h-0 p-0 overflow-hidden"
                }`}
              >
                <p className="opacity-50 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Signed in as
                </p>
                <p className="font-black text-sm truncate uppercase tracking-tighter text-red-500">
                  {role}
                </p>
              </div>
              {!isExpanded && (
                <div className="w-12 h-12 bg-red-600 rounded-2xl mx-auto flex items-center justify-center text-white text-xs font-black shadow-lg shadow-red-200">
                  {role?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for cleaner NavLinks with Tooltips
const SidebarItem = ({
  to,
  icon,
  label,
  expanded,
  activeLink,
  normalLink,
  end = false,
}) => (
  <li>
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${
          isActive ? activeLink : normalLink
        } flex items-center h-12 rounded-xl px-0 relative group`
      }
    >
      <div className="min-w-[56px] flex justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {expanded ? (
        <span className="whitespace-nowrap">{label}</span>
      ) : (
        <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
          {label}
        </span>
      )}
    </NavLink>
  </li>
);

export default DashboardLayout;
