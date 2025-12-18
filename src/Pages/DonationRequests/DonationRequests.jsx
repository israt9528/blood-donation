import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  IoLocationSharp,
  IoCalendarOutline,
  IoTimeOutline,
  IoWater,
  IoEyeSharp,
} from "react-icons/io5";
import { motion } from "framer-motion";
import Loading from "../../Components/Loading/Loading";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/pending?donationStatus=pending`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen my-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Pending Requests
            </h1>
            <p className="text-slate-500 font-medium">
              Connect with people who need your help urgently.
            </p>
          </div>
          <div className="px-4 py-2 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold text-sm inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            {requests.length} Live Requests
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Recipient
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Location
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest">
                  Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-center">
                  Group
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">
                      {r.recipientName}
                    </p>
                    <p className="text-xs text-slate-400 font-medium tracking-tight uppercase">
                      Emergency Patient
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <IoLocationSharp className="text-red-500" />
                      <span>
                        {r.recipientUpazila}, {r.recipientDistrict}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                        <IoCalendarOutline className="text-slate-400" />{" "}
                        {r.donationDate}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <IoTimeOutline className="text-slate-400" />{" "}
                        {r.donationTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-red-600 font-black border border-red-100 shadow-sm">
                      {r.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link
                      to={`/dashboard/donation-request-details/${r._id}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all active:scale-95"
                    >
                      <IoEyeSharp /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {requests.map((r) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              key={r._id}
              className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {r.recipientName}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <IoLocationSharp className="text-red-500" />
                    {r.recipientUpazila}, {r.recipientDistrict}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black shadow-lg shadow-red-200">
                  {r.bloodGroup}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 my-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    Date
                  </p>
                  <p className="text-sm font-bold text-slate-700 italic">
                    {r.donationDate}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    Time
                  </p>
                  <p className="text-sm font-bold text-slate-700 italic">
                    {r.donationTime}
                  </p>
                </div>
              </div>

              <Link
                to={`/dashboard/donation-request-details/${r._id}`}
                className="w-full py-4 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-900 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <IoEyeSharp /> View Details
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-300">
            <IoWater className="mx-auto text-slate-200 text-7xl mb-4" />
            <h2 className="text-xl font-bold text-slate-400">
              No pending requests found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
