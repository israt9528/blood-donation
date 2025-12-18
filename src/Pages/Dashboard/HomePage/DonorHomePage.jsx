import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiEye,
  FiEdit3,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiFilter,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import Loading from "../../../Components/Loading/Loading";

const DonorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["requests-latest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/latest?email=${user.email}`);
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

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen space-y-8">
      {/* Welcome Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-700 to-slate-900 rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl shadow-red-200/50 group">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Live Dashboard
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-200">
                  {user?.displayName?.split(" ")[0]}
                </span>
              </h1>

              <p className="text-red-50/80 max-w-md font-medium text-lg leading-relaxed">
                Your heroic contributions have already impacted lives. Ready to
                help someone today?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/dashboard/create-donation-request")}
                className="flex items-center justify-center gap-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
              >
                <FiPlus className="text-xl" />
                NEW REQUEST
              </button>
            </div>
          </div>

          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
      </div>

      {/* Conditional Donation Requests Section */}
      {requests.length > 0 && (
        <div className="max-w-7xl mx-auto">
          {/* Table Header & Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 px-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Recent Requests
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Quickly manage your latest 3 posts
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
              <FiFilter className="ml-3 text-slate-400" />
              <select
                className="select select-sm select-ghost focus:bg-transparent font-bold text-slate-700"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest">
                    Recipient
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-center">
                    Group
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest">
                    Location
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest">
                    Schedule
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-right">
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
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">
                        {r.recipientName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                        Patient
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black border border-red-100 shadow-sm text-sm">
                          {r.bloodGroup}
                        </div>
                      </div>
                    </td>
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
                    <td className="px-6 py-5 text-center">
                      <StatusBadge status={r.donationStatus} />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/dashboard/donation-request-details/${r._id}`}
                          className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          to={`/dashboard/update-donation-request/${r._id}`}
                          className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <FiEdit3 />
                        </Link>
                        <button
                          onClick={() => handleRequestDelete(r._id)}
                          className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <FiTrash2 />
                        </button>

                        {r.donationStatus === "inprogress" && (
                          <div className="flex gap-2 ml-2 border-l pl-4 border-slate-200">
                            <button
                              onClick={() =>
                                handleDonationStatusUpdate(r, "done")
                              }
                              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded-lg shadow-md transition-all"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                handleDonationStatusUpdate(r, "canceled")
                              }
                              className="px-3 py-1.5 bg-slate-400 hover:bg-slate-500 text-white text-[10px] font-bold rounded-lg transition-all"
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

            {/* Footer Navigation */}
            <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-100">
              <button
                onClick={() => navigate("/dashboard/my-donation-requests")}
                className="flex items-center gap-2 text-sm font-black text-slate-600 hover:text-red-500 transition-colors uppercase tracking-widest"
              >
                View Full History <FiArrowRight />
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {filteredRequests.map((r) => (
              <div
                key={r._id}
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm">
                      {r.bloodGroup}
                    </div>
                    <h3 className="font-black text-slate-900">
                      {r.recipientName}
                    </h3>
                  </div>
                  <StatusBadge status={r.donationStatus} />
                </div>
                <Link
                  to={`/dashboard/donation-request-details/${r._id}`}
                  className="w-full py-3 bg-slate-100 text-slate-900 rounded-xl font-bold text-center block text-sm mb-2"
                >
                  View Details
                </Link>
                <button
                  onClick={() => navigate("/dashboard/my-donation-requests")}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-center block text-sm"
                >
                  Go to My Requests
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Status Badge Component
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
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${config.bg} ${config.text} border border-current opacity-80 mx-auto`}
    >
      <span>{config.icon}</span> {config.label}
    </span>
  );
};

export default DonorHome;
