import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HiDotsVertical,
  HiOutlineUsers,
  HiCheckCircle,
  HiBan,
} from "react-icons/hi";
import { FaUserShield, FaUserEdit } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: donors = [], refetch } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors");
      return res.data;
    },
  });

  const filteredDonors =
    statusFilter === "all"
      ? donors
      : donors.filter((d) => d.status === statusFilter);

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const currentDonors = filteredDonors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDonorStatus = (donor, status) => {
    axiosSecure.patch(`/donors/${donor._id}/status`, { status }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `User ${status}`,
          timer: 1500,
          showConfirmButton: false,
          background: "#fff",
          color: "#1e293b",
          iconColor: status === "active" ? "#10b981" : "#ef4444",
        });
      }
    });
  };

  const handleUpdateRole = (donor, role) => {
    axiosSecure.patch(`/donors/${donor._id}/role`, { role }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Role updated to ${role}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <HiOutlineUsers size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Administration
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Control platform access, verify roles, and monitor account statuses.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">
            Filter By Status
          </label>
          <select
            className="select select-bordered w-full md:w-48 rounded-2xl border-slate-200 focus:ring-2 focus:ring-red-100 focus:border-red-500 font-bold text-slate-700"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Total Users ({donors.length})</option>
            <option value="active">Active Members</option>
            <option value="blocked">Blocked Accounts</option>
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-slate-50/50">
              <tr className="border-b border-slate-100">
                <th className="py-5 text-slate-500 font-black text-[11px] uppercase tracking-widest pl-8">
                  Member
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Contact Info
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Privilege
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Access Status
                </th>
                <th className="text-right pr-8 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentDonors.map((d) => (
                <tr
                  key={d._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {/* User Profile */}
                  <td className="pl-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="h-12 w-12 rounded-2xl ring-4 ring-slate-50 overflow-hidden">
                          <img
                            src={d.image}
                            alt={d.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-slate-800 tracking-tight">
                          {d.name}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          ID: {d._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="text-sm font-semibold text-slate-600">
                      {d.email}
                    </span>
                  </td>

                  {/* Role */}
                  <td>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider 
                      ${
                        d.role === "admin"
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {d.role === "admin" ? (
                        <FaUserShield size={12} />
                      ) : (
                        <FaUserEdit size={12} />
                      )}
                      {d.role}
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <div
                      className={`badge badge-sm border-none font-black text-[10px] uppercase h-6 px-3 tracking-widest
                      ${
                        d.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.status}
                    </div>
                  </td>

                  {/* Actions Dropdown */}
                  <td className="text-right pr-8">
                    <div className="dropdown dropdown-left">
                      <button
                        tabIndex={0}
                        className="btn btn-ghost btn-sm hover:bg-slate-100 rounded-xl text-slate-400"
                      >
                        <HiDotsVertical size={20} />
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[20] menu p-2 shadow-2xl bg-white rounded-2xl w-52 border border-slate-100"
                      >
                        <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Manage Access
                        </div>
                        <li>
                          <button
                            onClick={() => handleDonorStatus(d, "active")}
                            className="flex items-center gap-2 text-emerald-600 hover:bg-emerald-50"
                          >
                            <HiCheckCircle size={18} /> Unblock User
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDonorStatus(d, "blocked")}
                            className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                          >
                            <HiBan size={18} /> Block User
                          </button>
                        </li>
                        <div className="h-[1px] bg-slate-100 my-2 mx-2"></div>
                        <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Change Role
                        </div>
                        <li>
                          <button
                            onClick={() => handleUpdateRole(d, "admin")}
                            className="hover:bg-slate-50 font-bold text-slate-700 text-xs"
                          >
                            Promote to Admin
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleUpdateRole(d, "volunteer")}
                            className="hover:bg-slate-50 font-bold text-slate-700 text-xs"
                          >
                            Make Volunteer
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredDonors.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <HiOutlineUsers size={40} />
            </div>
            <p className="font-bold uppercase tracking-widest text-xs">
              No users matching your filter
            </p>
          </div>
        )}

        {/* Improved Pagination Area */}
        {totalPages > 1 && (
          <div className="bg-slate-50/50 px-8 py-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="btn btn-sm rounded-xl border-slate-200 bg-white hover:bg-red-600 hover:text-white transition-all font-bold"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <div className="flex gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all
                        ${
                          currentPage === i + 1
                            ? "bg-red-600 text-white shadow-lg shadow-red-200"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-red-400"
                        }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-sm rounded-xl border-slate-200 bg-white hover:bg-red-600 hover:text-white transition-all font-bold"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
