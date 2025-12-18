import React, { useRef } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FiArrowLeft,
  FiHeart,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiMail,
  FiActivity,
  FiHome,
  FiMessageSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const DonationRequestDetails = () => {
  const requestModalRef = useRef();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: request = {}, isLoading } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${id}`);
      return res.data;
    },
  });

  const {
    bloodGroup,
    donationDate,
    donationTime,
    donationStatus,
    hospitalName,
    fullAddress,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    requestMessage,
    requesterName,
    requesterEmail,
    createdAt,
  } = request;

  const openDonationRequestModal = () => {
    requestModalRef.current.showModal();
  };

  const handleConfirmDonation = (data) => {
    const donationInfo = {
      donorName: user?.displayName,
      donorEmail: user?.email,
    };
    axiosSecure.patch(`/requests/${id}`, donationInfo).then((res) => {
      if (res.data.modifiedCount) {
        requestModalRef.current.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Hero mode activated! Request in-progress.`,
          showConfirmButton: false,
          timer: 2000,
          customClass: { popup: "rounded-[2rem]" },
        });
        navigate(-1);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <motion.button
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold text-sm mb-6 transition-colors"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </motion.button>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden"
        >
          {/* Top Banner Section */}
          <div className="relative h-32 bg-slate-900 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
            <div className="relative h-full flex items-center px-8 md:px-12 justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  Request Details
                </h1>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mt-1">
                  Posted {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg ${
                  donationStatus === "pending"
                    ? "bg-amber-400 text-amber-950"
                    : donationStatus === "inprogress"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {donationStatus}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column: Primary Info */}
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <h3 className="flex items-center gap-2 text-slate-900 font-black text-lg mb-6 uppercase tracking-tight">
                    <FiActivity className="text-red-600" /> Patient & Medical
                    Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Info
                      icon={<FiUser />}
                      label="Recipient Name"
                      value={recipientName}
                    />
                    <Info
                      icon={<FiHeart />}
                      label="Blood Group Required"
                      value={bloodGroup}
                      highlight
                    />

                    {/* Recipient District & Upazila Highlight Card */}
                    <div className="flex gap-4 items-start col-span-1 sm:col-span-2 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                      <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white text-red-500 shadow-sm border border-slate-100">
                        <FiMapPin />
                      </div>
                      <div className="grid grid-cols-2 w-full gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">
                            District
                          </p>
                          <p className="font-bold text-slate-800">
                            {recipientDistrict}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">
                            Upazila
                          </p>
                          <p className="font-bold text-slate-800">
                            {recipientUpazila}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Info
                      icon={<FiHome />}
                      label="Hospital Name"
                      value={hospitalName}
                    />
                    <Info
                      icon={<FiMapPin />}
                      label="Full Address"
                      value={fullAddress}
                    />
                  </div>
                </section>

                <section className="pt-8 border-t border-slate-100">
                  <h3 className="flex items-center gap-2 text-slate-900 font-black text-lg mb-6 uppercase tracking-tight">
                    <FiCalendar className="text-red-600" /> Appointment Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Info
                      icon={<FiCalendar />}
                      label="Donation Date"
                      value={donationDate}
                    />
                    <Info
                      icon={<FiClock />}
                      label="Donation Time"
                      value={donationTime}
                    />
                  </div>
                </section>

                <section className="pt-8 border-t border-slate-100">
                  <h3 className="flex items-center gap-2 text-slate-900 font-black text-lg mb-4 uppercase tracking-tight">
                    <FiMessageSquare className="text-red-600" /> Request Message
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-slate-600 leading-relaxed shadow-inner">
                    "{requestMessage}"
                  </div>
                </section>
              </div>

              {/* Right Column: Requester Side Card */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 sticky top-8">
                  <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6 border-b border-slate-200 pb-4 text-center lg:text-left">
                    Posted By
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-200">
                        <FiUser size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                          Requester
                        </p>
                        <p className="font-bold text-slate-800">
                          {requesterName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-200">
                        <FiMail size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                          Contact Email
                        </p>
                        <p className="font-bold text-slate-800 truncate text-sm">
                          {requesterEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 space-y-4">
                    <button
                      disabled={donationStatus !== "pending"}
                      onClick={openDonationRequestModal}
                      className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black rounded-2xl shadow-xl shadow-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <FiHeart /> Donate Now
                    </button>
                    <p className="text-[10px] text-center text-slate-400 uppercase font-black tracking-widest">
                      Saving a life starts with you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modern Modal */}
      <dialog
        ref={requestModalRef}
        className="modal modal-bottom sm:modal-middle bg-slate-900/60 backdrop-blur-sm"
      >
        <div className="modal-box bg-white rounded-[2.5rem] p-8 max-w-md shadow-2xl border-none">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4">
              <FiHeart size={32} className="animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Confirm Donation
            </h3>
            <p className="text-slate-500 text-sm mt-2 font-medium px-4">
              By confirming, you agree to donate for{" "}
              <span className="text-red-600 font-bold">{recipientName}</span>.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleConfirmDonation)}
            className="space-y-4"
          >
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block px-1">
                  Donor Name
                </label>
                <p className="bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold">
                  {user?.displayName}
                </p>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block px-1">
                  Donor Email
                </label>
                <p className="bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => requestModalRef.current.close()}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-600 shadow-xl shadow-slate-200 transition-all"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

const Info = ({ icon, label, value, highlight }) => (
  <div className="flex gap-4 items-start group">
    <div
      className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors shadow-sm border border-slate-100 ${
        highlight ? "bg-red-50 text-red-600" : "bg-white text-slate-400"
      }`}
    >
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">
        {label}
      </p>
      <p
        className={`font-bold leading-tight ${
          highlight ? "text-red-600 text-xl md:text-2xl" : "text-slate-800"
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default DonationRequestDetails;
