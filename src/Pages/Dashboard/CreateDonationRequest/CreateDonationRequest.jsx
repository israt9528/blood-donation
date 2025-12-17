import React from "react";
import { useForm } from "react-hook-form";
import {
  FiSend,
  FiUser,
  FiMapPin,
  FiActivity,
  FiClock,
  FiCalendar,
  FiMessageCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donor = {} } = useQuery({
    queryKey: ["donor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors?email=${user?.email}`);
      return res.data[0] || {};
    },
  });

  const handleCreateRequest = (data) => {
    // Adding default status if not in form
    const requestData = {
      ...data,
      donationStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    Swal.fire({
      title: "Submit Request?",
      text: "This will be visible to potential donors in your area.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red-500
      cancelButtonColor: "#64748b", // Slate-500
      confirmButtonText: "Yes, Send Request",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl px-6 py-3 font-bold",
        cancelButton: "rounded-xl px-6 py-3 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/requests", requestData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Request Live!",
              text: "Your request has been broadcasted successfully.",
              icon: "success",
              customClass: { popup: "rounded-[2rem]" },
            });
            reset();
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 justify-center md:justify-start">
              <FiPlusCircle className="text-red-600" /> Create Request
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Fill in the details to find a blood donor quickly.
            </p>
          </div>
          {donor.status === "blocked" && (
            <div className="px-4 py-2 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold text-xs uppercase tracking-widest animate-pulse">
              Account Restricted
            </div>
          )}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden"
        >
          {/* Form Header Decor */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-400" />

          <form
            onSubmit={handleSubmit(handleCreateRequest)}
            className="p-8 md:p-12 space-y-10"
          >
            {/* --- SECTION 1: Requester Info --- */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-slate-200"></span> Your
                Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
                    Requester Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      {...register("requesterName")}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
                    Requester Email
                  </label>
                  <div className="relative">
                    <FiSend className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      defaultValue={user?.email}
                      {...register("requesterEmail")}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECTION 2: Recipient Details --- */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-slate-200"></span> Recipient &
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register("recipientName", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiMapPin className="text-red-500" /> District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka"
                    {...register("recipientDistrict", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiMapPin className="text-red-500" /> Upazila
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dhanmondi"
                    {...register("recipientUpazila", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiHome className="text-red-500" /> Hospital Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apollo Hospital"
                    {...register("hospitalName", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiActivity className="text-red-500" /> Blood Group
                  </label>
                  <select
                    {...register("bloodGroup", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none appearance-none"
                    required
                  >
                    <option value="">Select blood group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="form-control md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
                    Full Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House, Road, Area details..."
                    {...register("fullAddress", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </section>

            {/* --- SECTION 3: Schedule & Message --- */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-slate-200"></span> Schedule &
                Notes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiCalendar className="text-red-500" /> Donation Date
                  </label>
                  <input
                    type="date"
                    {...register("donationDate", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiClock className="text-red-500" /> Donation Time
                  </label>
                  <input
                    type="time"
                    {...register("donationTime", { required: true })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiMessageCircle className="text-red-500" /> Message to
                    Donors
                  </label>
                  <textarea
                    placeholder="Explain the emergency situation..."
                    {...register("requestMessage")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none"
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={donor.status === "blocked"}
                className={`w-full md:w-auto px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl active:scale-95 ${
                  donor.status === "blocked"
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-red-600 shadow-slate-200"
                }`}
              >
                <FiSend className="text-xl" />
                Broadcast Request
              </button>
              {donor.status === "blocked" && (
                <p className="text-red-500 text-xs font-bold mt-4 text-center md:text-left">
                  Your account is blocked. You cannot create new requests at
                  this time.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Internal Helper for Icons not imported above
const FiHome = ({ className }) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

export default CreateDonationRequest;
