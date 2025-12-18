import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiFilter,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiDroplet,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../../Components/Loading/Loading";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user.email}`);
      return res.data;
    },
  });

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === statusFilter);

  const handleRequestDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-[2rem]" },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Request has been removed.",
              icon: "success",
              customClass: { popup: "rounded-[2rem]" },
            });
          }
        });
      }
    });
  };

  const handleDonationStatusUpdate = (request, status) => {
    const statusInfo = { donationStatus: status };
    axiosSecure
      .patch(`/requests/${request._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `Marked as ${status}`,
            showConfirmButton: false,
            timer: 1500,
            customClass: { popup: "rounded-[2rem]" },
          });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Requests
            </h1>
            <p className="text-slate-500 font-medium">
              Manage and track your active blood donation posts.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 w-full md:w-auto">
            <FiFilter className="ml-3 text-slate-400" />
            <select
              className="select select-ghost focus:bg-transparent w-full md:w-48 font-bold text-slate-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">⏳ Pending</option>
              <option value="inprogress">⚡ In Progress</option>
              <option value="done">✅ Done</option>
              <option value="canceled">❌ Canceled</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Recipient
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-center">
                  Group
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Location
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Donor
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Recipient Name */}
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">
                      {r.recipientName}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                      Patient
                    </p>
                  </td>

                  {/* Blood Group Column */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex flex-col items-center justify-center font-black border border-red-100 shadow-sm">
                        <span className="text-sm leading-none">
                          {r.bloodGroup}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="px-6 py-5">
                    <div className="text-sm">
                      <p className="font-bold text-slate-700 flex items-center gap-1">
                        <FiMapPin className="text-red-500" size={12} />{" "}
                        {r.recipientUpazila}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {r.recipientDistrict}
                      </p>
                    </div>
                  </td>

                  {/* Schedule Column */}
                  <td className="px-6 py-5">
                    <div className="text-sm space-y-1">
                      <p className="flex items-center gap-2 text-slate-600 font-medium whitespace-nowrap">
                        <FiCalendar className="text-slate-400" />{" "}
                        {r.donationDate}
                      </p>
                      <p className="flex items-center gap-2 text-slate-400 text-xs">
                        <FiClock /> {r.donationTime}
                      </p>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5">
                    <StatusBadge status={r.donationStatus} />
                  </td>

                  {/* Donor Info Column */}
                  <td className="px-6 py-5">
                    {r.donorName ? (
                      <div className="text-xs">
                        <p className="font-bold text-slate-700">
                          {r.donorName}
                        </p>
                        <p className="text-slate-400 truncate w-32">
                          {r.donorEmail}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] italic text-slate-300 font-bold uppercase tracking-widest">
                        Searching...
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/dashboard/donation-request-details/${r._id}`}
                        className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                        title="View Details"
                      >
                        <FiEye />
                      </Link>
                      <Link
                        to={`/dashboard/update-donation-request/${r._id}`}
                        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Edit Request"
                      >
                        <FiEdit3 />
                      </Link>
                      <button
                        onClick={() => handleRequestDelete(r._id)}
                        className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete Request"
                      >
                        <FiTrash2 />
                      </button>

                      {r.donationStatus === "inprogress" && (
                        <div className="flex gap-2 ml-2 border-l pl-4 border-slate-200">
                          <button
                            onClick={() =>
                              handleDonationStatusUpdate(r, "done")
                            }
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg shadow-md transition-all"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleDonationStatusUpdate(r, "canceled")
                            }
                            className="px-3 py-1.5 bg-slate-400 hover:bg-slate-500 text-white text-xs font-bold rounded-lg transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredRequests.map((r) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={r._id}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-lg"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black shadow-lg shadow-red-100 text-lg">
                      {r.bloodGroup}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900">
                        {r.recipientName}
                      </h3>
                      <StatusBadge status={r.donationStatus} />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link
                      to={`/dashboard/update-donation-request/${r._id}`}
                      className="p-2 text-blue-500"
                    >
                      <FiEdit3 />
                    </Link>
                    <button
                      onClick={() => handleRequestDelete(r._id)}
                      className="p-2 text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Location
                    </p>
                    <p className="text-sm text-slate-700 font-bold">
                      {r.recipientUpazila}
                    </p>
                    <p className="text-xs text-slate-500">
                      {r.recipientDistrict}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Schedule
                    </p>
                    <p className="text-sm text-slate-700 font-bold">
                      {r.donationDate}
                    </p>
                    <p className="text-xs text-slate-500">{r.donationTime}</p>
                  </div>
                </div>

                {r.donorName && (
                  <div className="mb-6 flex items-center gap-3 border-t pt-4 border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <FiUser className="text-slate-500" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-slate-700">{r.donorName}</p>
                      <p className="text-slate-400">{r.donorEmail}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Link
                    to={`/dashboard/donation-request-details/${r._id}`}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-center flex items-center justify-center gap-2"
                  >
                    <FiEye /> View Full Details
                  </Link>
                  {r.donationStatus === "inprogress" && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        onClick={() => handleDonationStatusUpdate(r, "done")}
                        className="py-3 bg-green-500 text-white rounded-xl font-bold"
                      >
                        Mark Done
                      </button>
                      <button
                        onClick={() =>
                          handleDonationStatusUpdate(r, "canceled")
                        }
                        className="py-3 bg-slate-300 text-slate-700 rounded-xl font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-300 mt-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiDroplet className="text-slate-200 text-4xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-400">
              No requests found here
            </h2>
            <Link
              to="/dashboard/create-donation-request"
              className="text-red-600 font-bold mt-2 inline-block hover:underline"
            >
              Create your first request
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Status Badges
const StatusBadge = ({ status }) => {
  const configs = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      icon: "⏳",
      label: "Pending",
    },
    inprogress: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: "⚡",
      label: "In Progress",
    },
    done: {
      bg: "bg-green-50",
      text: "text-green-600",
      icon: "✅",
      label: "Done",
    },
    canceled: {
      bg: "bg-red-50",
      text: "text-red-500",
      icon: "❌",
      label: "Canceled",
    },
  };

  const config = configs[status] || configs.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${config.bg} ${config.text} border border-current opacity-80`}
    >
      <span>{config.icon}</span> {config.label}
    </span>
  );
};

export default MyDonationRequests;
