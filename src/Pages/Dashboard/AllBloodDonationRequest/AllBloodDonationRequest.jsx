import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { HiDotsVertical } from "react-icons/hi";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/all");
      return res.data;
    },
  });

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === statusFilter);

  const handleRequestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your donation request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDonationStatusUpdate = (request, status) => {
    axiosSecure
      .patch(`/requests/${request._id}/status`, { donationStatus: status })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Donation status updated to ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const statusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full font-semibold text-xs uppercase";
    switch (status) {
      case "pending":
        return (
          <span className={`${baseClasses} text-yellow-700 bg-yellow-100`}>
            {status}
          </span>
        );
      case "inprogress":
        return (
          <span className={`${baseClasses} text-blue-700 bg-blue-100`}>
            {status}
          </span>
        );
      case "done":
        return (
          <span className={`${baseClasses} text-green-700 bg-green-100`}>
            {status}
          </span>
        );
      case "canceled":
        return (
          <span className={`${baseClasses} text-red-700 bg-red-100`}>
            {status}
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} text-gray-700 bg-gray-100`}>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Blood Donation Requests
          </h1>
          <p className="mt-1 text-gray-500">
            Review and manage all blood donation requests submitted by
            recipients.
          </p>
        </div>

        {/* Card container */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl p-6">
          {/* Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-lg font-semibold text-gray-700">
              All Requests ({filteredRequests.length})
            </h2>
            <select
              className="select select-bordered w-full max-w-xs"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full text-sm sm:text-base">
              <thead className="bg-base-100 text-gray-600">
                <tr>
                  <th>#</th>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((r, i) => (
                  <tr key={r._id} className="hover:bg-red-50/20 transition">
                    <td className="text-gray-700 font-medium">{i + 1}</td>
                    <td className="text-red-600 font-semibold">
                      {r.recipientName}
                    </td>
                    <td>
                      <p className="text-gray-600">
                        Upazila: {r.recipientUpazila}
                      </p>
                      <p className="text-gray-600">
                        District: {r.recipientDistrict}
                      </p>
                    </td>
                    <td className="text-gray-700">{r.donationDate}</td>
                    <td className="text-gray-700">{r.donationTime}</td>
                    <td className="text-red-700 font-semibold">
                      {r.bloodGroup}
                    </td>
                    <td>{statusBadge(r.donationStatus)}</td>
                    <td>
                      <p className="text-gray-700 font-medium">
                        Name: {r.donorName}
                      </p>
                      <p className="text-gray-700 font-medium">
                        Email: {r.donorEmail}
                      </p>
                    </td>
                    <td>
                      {/* Dropdown Menu */}
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm btn-circle">
                          <HiDotsVertical className="text-gray-700 text-xl" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-white rounded-box w-48"
                        >
                          <li>
                            <Link
                              to={`/dashboard/donation-request-details/${r._id}`}
                              className="flex items-center gap-2 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded"
                            >
                              <FiEye /> View
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/dashboard/update-donation-request/${r._id}`}
                              className="flex items-center gap-2 text-purple-600 hover:bg-purple-100 px-2 py-1 rounded"
                            >
                              <FiEdit2 /> Edit
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => handleRequestDelete(r._id)}
                              className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-2 py-1 rounded w-full"
                            >
                              <FiTrash2 /> Delete
                            </button>
                          </li>
                          {r.donationStatus === "inprogress" && (
                            <>
                              <li>
                                <button
                                  onClick={() =>
                                    handleDonationStatusUpdate(r, "done")
                                  }
                                  className="flex items-center gap-2 text-green-600 hover:bg-green-100 px-2 py-1 rounded w-full"
                                >
                                  <FiCheckCircle /> Done
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleDonationStatusUpdate(r, "canceled")
                                  }
                                  className="flex items-center gap-2 text-yellow-600 hover:bg-yellow-100 px-2 py-1 rounded w-full"
                                >
                                  <FiXCircle /> Cancel
                                </button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRequests.length === 0 && (
              <p className="py-10 text-center text-gray-500">
                No donation requests found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
