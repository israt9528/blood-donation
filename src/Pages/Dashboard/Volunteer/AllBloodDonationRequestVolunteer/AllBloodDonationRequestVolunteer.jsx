import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { HiOutlineFilter, HiOutlineClipboardList } from "react-icons/hi";
import {
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { BiDonateBlood } from "react-icons/bi";

const AllBloodDonationRequestVolunteer = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === statusFilter);

  const handleDonationStatusUpdate = (request, status) => {
    const statusInfo = {
      donationStatus: status,
    };
    let message = `Donation status updated to ${status}`;
    axiosSecure
      .patch(`/requests/${request._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
            background: "#fff",
            color: "#1e293b",
          });
        }
      });
  };

  const statusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-xl font-black text-[10px] uppercase tracking-wider border";
    switch (status) {
      case "pending":
        return (
          <span
            className={`${baseClasses} text-amber-600 bg-amber-50 border-amber-100`}
          >
            {status}
          </span>
        );
      case "inprogress":
        return (
          <span
            className={`${baseClasses} text-blue-600 bg-blue-50 border-blue-100`}
          >
            {status}
          </span>
        );
      case "done":
        return (
          <span
            className={`${baseClasses} text-emerald-600 bg-emerald-50 border-emerald-100`}
          >
            {status}
          </span>
        );
      case "canceled":
        return (
          <span
            className={`${baseClasses} text-rose-600 bg-rose-50 border-rose-100`}
          >
            {status}
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} text-slate-600 bg-slate-50 border-slate-100`}
          >
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <HiOutlineClipboardList size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Volunteer Portal
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Donation Management
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-xl">
            Review community requests and update donation progress.
          </p>
        </div>

        {/* Filter Area */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="p-2 text-slate-400">
            <HiOutlineFilter size={20} />
          </div>
          <select
            className="select select-ghost select-sm w-full md:w-40 focus:bg-transparent font-bold text-slate-700 focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50/50">
              <tr className="border-b border-slate-100">
                <th className="py-5 text-slate-500 font-black text-[11px] uppercase tracking-widest pl-8">
                  #
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Recipient
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Location
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Schedule
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest text-center">
                  Group
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Status
                </th>
                <th className="text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Donor Info
                </th>
                <th className="text-right pr-8 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRequests.map((r, i) => (
                <tr
                  key={r._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="pl-8 text-slate-400 font-bold text-xs">
                    {i + 1}
                  </td>

                  <td>
                    <div className="font-black text-slate-800 tracking-tight underline decoration-red-200 underline-offset-4 decoration-2">
                      {r.recipientName}
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <FiMapPin className="text-red-400" />{" "}
                        {r.recipientUpazila}
                      </div>
                      <div className="text-[10px] font-black text-slate-400 uppercase ml-5">
                        {r.recipientDistrict}
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                        <FiCalendar className="text-slate-400" />{" "}
                        {r.donationDate}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                        <FiClock className="text-slate-400" /> {r.donationTime}
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 font-black text-xs mx-auto border border-red-100 shadow-sm group-hover:scale-110 transition-transform">
                      {r.bloodGroup}
                    </span>
                  </td>

                  <td>{statusBadge(r.donationStatus)}</td>

                  <td>
                    {r.donorName ? (
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-slate-700">
                          {r.donorName}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400 truncate w-32">
                          {r.donorEmail}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 italic uppercase">
                        Unassigned
                      </span>
                    )}
                  </td>

                  <td className="text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/dashboard/donation-request-details/${r._id}`}
                        className="btn btn-xs md:btn-sm btn-ghost hover:bg-slate-100 rounded-xl text-blue-600 font-bold gap-2"
                      >
                        <FiEye size={16} />
                        <span className="hidden sm:inline">View</span>
                      </Link>

                      {r.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() =>
                              handleDonationStatusUpdate(r, "done")
                            }
                            className="btn btn-xs md:btn-sm btn-ghost hover:bg-emerald-50 rounded-xl text-emerald-600 font-bold gap-2"
                          >
                            <FiCheckCircle size={16} />
                            <span className="hidden sm:inline">Done</span>
                          </button>
                          <button
                            onClick={() =>
                              handleDonationStatusUpdate(r, "canceled")
                            }
                            className="btn btn-xs md:btn-sm btn-ghost hover:bg-rose-50 rounded-xl text-rose-600 font-bold gap-2"
                          >
                            <FiXCircle size={16} />
                            <span className="hidden sm:inline">Cancel</span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <BiDonateBlood size={40} />
            </div>
            <p className="font-bold uppercase tracking-widest text-xs">
              No requests found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBloodDonationRequestVolunteer;
