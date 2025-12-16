import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiDotsVertical } from "react-icons/hi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="mt-1 text-gray-500">
            Manage platform users, roles, and access status
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-700">All Users</h2>

            <select
              className="select select-bordered w-full max-w-xs"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // reset page
              }}
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-100 text-gray-600">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentDonors.map((d) => (
                  <tr key={d._id} className="hover:bg-red-50/40 transition">
                    {/* User */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="h-11 w-11 rounded-full ring-2 ring-red-500/20">
                            <img src={d.image} alt={d.name} />
                          </div>
                        </div>
                        <span className="font-medium">{d.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-gray-600">{d.email}</td>

                    {/* Role */}
                    <td>
                      <span className="badge badge-outline capitalize">
                        {d.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          d.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <div className="dropdown dropdown-left">
                        <button tabIndex={0} className="btn btn-ghost btn-sm">
                          <HiDotsVertical size={18} />
                        </button>
                        <ul
                          tabIndex={0}
                          className="menu dropdown-content z-10 w-52 rounded-xl
                          bg-white shadow-lg"
                        >
                          <li className="menu-title">Status</li>
                          <li>
                            <button
                              onClick={() => handleDonorStatus(d, "active")}
                            >
                              Unblock
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDonorStatus(d, "blocked")}
                            >
                              Block
                            </button>
                          </li>

                          <li className="menu-title">Role</li>
                          <li>
                            <button
                              onClick={() => handleUpdateRole(d, "admin")}
                            >
                              Make Admin
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleUpdateRole(d, "volunteer")}
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

            {filteredDonors.length === 0 && (
              <p className="py-10 text-center text-gray-500">No users found</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 py-4">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    currentPage === i + 1 ? "btn-active" : "btn-outline"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-sm btn-outline"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
