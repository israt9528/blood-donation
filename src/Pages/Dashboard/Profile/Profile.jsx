import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import {
  FiEdit2,
  FiSave,
  FiUpload,
  FiCheckCircle,
  FiUser,
  FiMail,
  FiMapPin,
  FiDroplet,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: donor = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors?email=${user?.email}`);
      return res.data[0];
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

  const showToast = (message, success = true) => {
    setToast({ show: true, message, success });
    setTimeout(() => setToast({ show: false }), 3000);
  };

  const { register, handleSubmit } = useForm();

  const handleUpdateProfile = async (data) => {
    // Keep functionality exactly as provided
    let imageUrl = donor.image;

    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("key", import.meta.env.VITE_image_api);
      formData.append("image", data.image[0]);

      try {
        const imgRes = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );
        imageUrl = imgRes.data.data.url;
      } catch (err) {
        showToast("Image upload failed", false);
      }
    }

    const updatedInfo = {
      name: data.name || donor.name,
      email: donor.email,
      image: imageUrl,
      bloodGroup: data.bloodGroup || donor.bloodGroup,
      district: data.district || donor.district,
      upazila: data.upazila || donor.upazila,
    };

    axiosSecure.put(`/donors/${donor._id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        showToast("Profile updated successfully ✅");
        setIsEditing(false);
        refetch();
      } else {
        showToast("No changes were made", false);
        setIsEditing(false);
      }
    });

    updateUser({ displayName: data.name, photoURL: imageUrl }).catch(() =>
      showToast("Profile update failed ❌", false)
    );
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Account Settings
            </h1>
            <p className="mt-2 text-slate-500 font-medium">
              Manage your profile and blood group preferences.
            </p>
          </div>
          <div className="h-1 w-20 bg-red-600 rounded-full hidden md:block mb-2"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-white"
        >
          {/* Top Banner Accent */}
          <div className="h-32 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 relative">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute right-6 bottom-[-24px] btn btn-circle bg-white hover:bg-slate-100 border-none shadow-xl text-red-600"
              >
                <FiEdit2 size={20} />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="absolute right-6 bottom-[-24px] btn btn-circle bg-slate-900 hover:bg-black border-none shadow-xl text-white"
              >
                <FiX size={20} />
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="px-6 pb-12 pt-1"
          >
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Profile Sidebar */}
              <div className="flex flex-col items-center lg:w-1/3 -mt-16 relative z-10">
                <div className="relative group">
                  <div className="h-44 w-44 overflow-hidden rounded-[3rem] ring-8 ring-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={donor.image || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <AnimatePresence>
                    {isEditing && (
                      <motion.label
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[3rem] cursor-pointer backdrop-blur-[2px]"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg text-slate-900">
                          <FiUpload size={24} />
                        </div>
                        <input
                          type="file"
                          {...register("image")}
                          className="hidden"
                        />
                      </motion.label>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {donor.name}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 bg-red-50 text-red-600 rounded-full text-sm font-black uppercase tracking-widest border border-red-100">
                    <FiDroplet /> {donor.bloodGroup}
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="flex-1 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="form-control w-full">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                      <FiUser /> Full Name
                    </label>
                    <input
                      {...register("name")}
                      defaultValue={donor.name}
                      disabled={!isEditing}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none
                        ${
                          isEditing
                            ? "bg-white border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 font-bold"
                            : "bg-slate-50 border-transparent text-slate-600 cursor-not-allowed font-medium"
                        }`}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-control w-full">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                      <FiMail /> Email Address
                    </label>
                    <input
                      defaultValue={donor.email}
                      disabled
                      className="w-full px-5 py-4 rounded-2xl border border-transparent bg-slate-100 text-slate-400 font-medium cursor-not-allowed"
                    />
                  </div>

                  {/* District Field */}
                  <div className="form-control w-full">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                      <FiMapPin /> District
                    </label>
                    <input
                      {...register("district")}
                      defaultValue={donor.district}
                      disabled={!isEditing}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none
                        ${
                          isEditing
                            ? "bg-white border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 font-bold"
                            : "bg-slate-50 border-transparent text-slate-600 cursor-not-allowed font-medium"
                        }`}
                    />
                  </div>

                  {/* Upazila Field */}
                  <div className="form-control w-full">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                      <FiMapPin /> Upazila
                    </label>
                    <input
                      {...register("upazila")}
                      defaultValue={donor.upazila}
                      disabled={!isEditing}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none
                        ${
                          isEditing
                            ? "bg-white border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 font-bold"
                            : "bg-slate-50 border-transparent text-slate-600 cursor-not-allowed font-medium"
                        }`}
                    />
                  </div>

                  {/* Blood Group Field */}
                  <div className="form-control w-full sm:col-span-2">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-1 flex items-center gap-2">
                      <FiDroplet /> Blood Group Selection
                    </label>
                    <select
                      {...register("bloodGroup")}
                      disabled={!isEditing}
                      defaultValue={donor.bloodGroup}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none appearance-none
                        ${
                          isEditing
                            ? "bg-white border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 font-bold cursor-pointer"
                            : "bg-slate-50 border-transparent text-slate-600 cursor-not-allowed font-medium"
                        }`}
                    >
                      <option value={donor.bloodGroup}>
                        {donor.bloodGroup} (Current)
                      </option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4"
                    >
                      <button
                        type="submit"
                        className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
                      >
                        <FiSave /> Update Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>

          {/* Card Footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <FiCheckCircle
                className={isEditing ? "text-amber-500" : "text-green-500"}
              />
              {isEditing ? "UNSAVED CHANGES" : "VERIFIED DONOR PROFILE"}
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline uppercase tracking-widest">
              Secured by LifeDrop Auth
            </span>
          </div>
        </motion.div>
      </div>

      {/* Modern Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div
              className={`p-4 rounded-2xl shadow-2xl flex items-center gap-4 border
              ${
                toast.success
                  ? "bg-white border-green-100"
                  : "bg-white border-red-100"
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  toast.success
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <FiCheckCircle size={20} />
              </div>
              <p className="font-bold text-slate-800 flex-1">{toast.message}</p>
              <button
                onClick={() => setToast({ show: false })}
                className="text-slate-400 hover:text-slate-600"
              >
                <FiX />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
