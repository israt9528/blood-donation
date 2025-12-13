import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FiEdit2, FiSave, FiUpload, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// const IMGBB_API_KEY = import.meta.env.VITE_image_api || "";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donor = [], refetch } = useQuery({
    queryKey: ["donor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors?email=${user?.email}`);
      return res.data[0];
    },
  });
  //   console.log(donor);

  const [isEditing, setIsEditing] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

  const showToast = (message, success = true) => {
    setToast({ show: true, message, success });

    setTimeout(() => {
      setToast({ show: false, message: "", success: true });
    }, 3000);
  };

  const { register, handleSubmit } = useForm();

  const handleUpdateProfile = async (data) => {
    console.log(data);
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
      email: data.email || donor.email,
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
      }
    });

    const updateProfile = {
      displayName: data.name,
      photoURL: imageUrl,
    };

    updateUser(updateProfile)
      .then(() => {
        console.log("user profile updated");
        //   navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        showToast("Profile update failed ❌", false);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="card bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            {isEditing === false && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-sm flex gap-2"
              >
                <FiEdit2 /> Edit
              </button>
            )}
          </div>

          {/* Form */}
          <form
            id="profileForm"
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow ring ring-primary ring-offset-2">
                  <img
                    src={donor.image}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <label
                  className={`btn btn-outline btn-sm gap-2 ${
                    !isEditing ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <FiUpload />
                  Choose File
                  <input
                    type="file"
                    {...register("image")}
                    className="hidden"
                    disabled={!isEditing}
                  />
                </label>
              </div>

              {/* Inputs */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="fieldset">
                  <label className="label font-medium">Name</label>
                  <input
                    {...register("name")}
                    defaultValue={donor.name}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Email</label>
                  <input
                    {...register("email")}
                    defaultValue={donor.email}
                    disabled
                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">District</label>
                  <input
                    {...register("district")}
                    defaultValue={donor.district}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Upazila</label>
                  <input
                    {...register("upazila")}
                    defaultValue={donor.upazila}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label font-medium">Blood Group</label>
                  <select
                    {...register("bloodGroup")}
                    disabled={!isEditing}
                    className="select select-bordered w-full"
                    defaultValue={donor.bloodGroup}
                  >
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
            {isEditing === true && (
              <button
                type="submit"
                form="profileForm"
                className={`btn btn-success btn-sm flex gap-2`}
              >
                <FiSave /> save
              </button>
            )}
          </form>

          {/* Footer */}
          <div className="p-4 border-t text-sm text-gray-600 flex justify-between">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-success" />
              <span>{isEditing ? "Editing…" : "Ready"}</span>
            </div>
            <small>Last updated: just now</small>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed right-4 bottom-6 z-50"
          >
            <div
              className={`alert ${
                toast.success ? "alert-success" : "alert-error"
              } shadow-lg`}
            >
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
