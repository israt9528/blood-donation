import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
  FiSend,
  FiUser,
  FiMapPin,
  FiActivity,
  FiClock,
  FiCalendar,
  FiMessageCircle,
  FiHome,
  FiRefreshCw,
} from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateDonationRequest = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: request = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${id}`);
      return res.data;
    },
  });

  const handleUpdateRequest = (data) => {
    const updatedRequest = {
      recipientName: data.recipientName || request.recipientName,
      recipientDistrict: data.recipientDistrict || request.recipientDistrict,
      recipientUpazila: data.recipientUpazila || request.recipientUpazila,
      fullAddress: data.fullAddress || request.fullAddress,
      hospitalName: data.hospitalName || request.hospitalName,
      donationDate: data.donationDate || request.donationDate,
      donationTime: data.donationTime || request.donationTime,
      bloodGroup: data.bloodGroup || request.bloodGroup,
      requestMessage: data.requestMessage || request.requestMessage,
    };

    axiosSecure.put(`/requests/${id}`, updatedRequest).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Request Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: "rounded-[2rem]" },
        });
        navigate(-1);
      }
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-ring loading-lg text-red-600"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 justify-center md:justify-start">
              <FiRefreshCw className="text-red-600 animate-spin-slow" /> Update
              Request
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Modify details for your blood donation post.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
          >
            Cancel & Go Back
          </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden"
        >
          {/* Accent bar */}
          <div className="h-2 bg-gradient-to-r from-red-600 to-red-400" />

          <form
            onSubmit={handleSubmit(handleUpdateRequest)}
            className="p-8 md:p-12 space-y-10"
          >
            {/* --- Requester (Read Only) --- */}
            <section className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1">
                Author Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="text-xs font-bold text-slate-500 mb-2 ml-1 uppercase">
                    Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-400 font-medium cursor-not-allowed italic"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="text-xs font-bold text-slate-500 mb-2 ml-1 uppercase">
                    Email
                  </label>
                  <div className="relative">
                    <FiSend className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-400 font-medium cursor-not-allowed italic"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* --- Recipient Details --- */}
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1 flex items-center gap-2">
                Recipient & Medical Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    defaultValue={request.recipientName}
                    {...register("recipientName")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold text-slate-800"
                  />
                </div>

                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiActivity className="text-red-500" /> Blood Group
                  </label>
                  <select
                    defaultValue={request.bloodGroup}
                    {...register("bloodGroup")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none appearance-none font-bold"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiHome className="text-red-500" /> Hospital Name
                  </label>
                  <input
                    type="text"
                    defaultValue={request.hospitalName}
                    {...register("hospitalName")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold"
                  />
                </div>

                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiMapPin className="text-red-500" /> District
                  </label>
                  <input
                    type="text"
                    defaultValue={request.recipientDistrict}
                    {...register("recipientDistrict")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold"
                  />
                </div>

                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiMapPin className="text-red-500" /> Upazila
                  </label>
                  <input
                    type="text"
                    defaultValue={request.recipientUpazila}
                    {...register("recipientUpazila")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1">
                    Full Address
                  </label>
                  <textarea
                    rows={2}
                    defaultValue={request.fullAddress}
                    {...register("fullAddress")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </section>

            {/* --- Schedule & Message --- */}
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1">
                Schedule & Notes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiCalendar className="text-red-500" /> Donation Date
                  </label>
                  <input
                    type="date"
                    defaultValue={request.donationDate}
                    {...register("donationDate")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold"
                  />
                </div>
                <div className="form-control">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiClock className="text-red-500" /> Donation Time
                  </label>
                  <input
                    type="time"
                    defaultValue={request.donationTime}
                    {...register("donationTime")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold"
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                    <FiMessageCircle className="text-red-500" /> Request Message
                  </label>
                  <textarea
                    defaultValue={request.requestMessage}
                    {...register("requestMessage")}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-medium"
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-xs text-slate-400 font-medium md:max-w-xs text-center md:text-left">
                Check all details carefully before updating. Donors will see
                these changes immediately.
              </p>
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl active:scale-95 uppercase tracking-widest"
              >
                <FiRefreshCw /> Update Details
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
