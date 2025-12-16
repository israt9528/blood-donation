import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FiEdit2, FiSave, FiUpload, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donor = {}, refetch } = useQuery({
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
    setIsEditing(false);
    let imageUrl = donor.image;

    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("key", import.meta.env.VITE_image_api);
      formData.append("image", data.image[0]);

      const imgRes = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      imageUrl = imgRes.data.data.url;
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
        refetch();
      } else {
        showToast("No changes were made", false);
      }
    });

    updateUser({ displayName: data.name, photoURL: imageUrl }).catch(() =>
      showToast("Profile update failed ❌", false)
    );
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          <p className="mt-1 text-gray-500">
            View and update your personal information
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h2>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700 border-none gap-2"
              >
                <FiEdit2 /> Edit Profile
              </button>
            )}
          </div>

          {/* Form */}
          <form
            id="profileForm"
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="px-6 py-8"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-red-500/30">
                  <img
                    src={donor.image}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <label
                  className={`btn btn-outline btn-sm mt-4 gap-2 ${
                    !isEditing && "pointer-events-none opacity-50"
                  }`}
                >
                  <FiUpload />
                  Change Photo
                  <input
                    type="file"
                    {...register("image")}
                    className="hidden"
                    disabled={!isEditing}
                  />
                </label>
              </div>

              {/* Inputs */}
              <div className="md:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="label font-medium">Name</label>
                  <input
                    {...register("name")}
                    defaultValue={donor.name}
                    disabled={!isEditing}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label font-medium">Email</label>
                  <input
                    defaultValue={donor.email}
                    disabled
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="label font-medium">District</label>
                  <input
                    {...register("district")}
                    defaultValue={donor.district}
                    disabled={!isEditing}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label font-medium">Upazila</label>
                  <input
                    {...register("upazila")}
                    defaultValue={donor.upazila}
                    disabled={!isEditing}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label font-medium">Blood Group</label>
                  <select
                    {...register("bloodGroup")}
                    disabled={!isEditing}
                    defaultValue={donor.bloodGroup}
                    className="select select-bordered w-full"
                  >
                    <option>{donor.bloodGroup}</option>
                    <option>A+</option>
                    <option>A−</option>
                    <option>B+</option>
                    <option>B−</option>
                    <option>AB+</option>
                    <option>AB−</option>
                    <option>O+</option>
                    <option>O−</option>
                  </select>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="btn bg-green-600 text-white hover:bg-green-700 gap-2"
                >
                  <FiSave /> Save Changes
                </button>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between border-t bg-base-100 px-6 py-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-green-500" />
              {isEditing ? "Editing profile…" : "Profile is up to date"}
            </div>
            <span>Last updated: just now</span>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-6 right-4 z-50"
          >
            <div
              className={`alert shadow-lg ${
                toast.success ? "alert-success" : "alert-error"
              }`}
            >
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
