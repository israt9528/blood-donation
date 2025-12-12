import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FiEdit2, FiSave, FiUpload, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const IMGBB_API_KEY = import.meta.env.VITE_image_api || "";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donor = {}, refetch } = useQuery({
    queryKey: ["donor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors?email=${user?.email}`);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });
  const showToast = (msg, success = true) => {
    setToast({ show: true, message: msg, success });
    setTimeout(
      () => setToast({ show: false, message: "", success: true }),
      4000
    );
  };

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: donor,
  });

  // Initialize form only when donor data arrives
  useEffect(() => {
    if (donor && donor._id) {
      reset(donor);
      setAvatarPreview(donor.image);
    }
  }, [donor, reset]);

  // Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Upload to ImgBB
  const uploadToImgBB = async (file) => {
    const base64 = await fileToBase64(file);
    const form = new FormData();
    form.append("key", IMGBB_API_KEY);
    form.append("image", base64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: form,
    });
    const json = await res.json();
    if (!json.success) throw new Error("ImgBB upload failed");
    return json.data.url;
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      let finalAvatarUrl = donor.image;

      if (avatarFile) {
        finalAvatarUrl = await uploadToImgBB(avatarFile);
      }

      const updatedData = {
        ...data,
        image: finalAvatarUrl,
        modifiedAt: new Date(),
      };

      // Prevent updating _id or email
      delete updatedData._id;
      delete updatedData.email;

      // Call backend
      await axiosSecure.put(`/donors/${donor._id}`, updatedData);

      // Update form with saved values
      reset({ ...donor, ...updatedData, email: donor.email });
      setAvatarPreview(finalAvatarUrl);
      setAvatarFile(null);
      setIsEditing(false);

      refetch();
      showToast("Profile updated successfully!");
    } catch (err) {
      showToast("Update failed: " + err.message, false);
    } finally {
      setSaving(false);
    }
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
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-sm flex gap-2"
              >
                <FiEdit2 /> Edit
              </button>
            ) : (
              <button
                type="submit"
                form="profileForm"
                className={`btn btn-success btn-sm flex gap-2 ${
                  saving ? "loading" : ""
                }`}
              >
                <FiSave /> {saving ? "Saving..." : "Save"}
              </button>
            )}
          </div>

          {/* Form */}
          <form
            id="profileForm"
            onSubmit={handleSubmit(onSubmit)}
            className="p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow ring ring-primary ring-offset-2">
                  <img
                    src={avatarPreview}
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
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarSelect}
                    disabled={!isEditing}
                  />
                </label>
              </div>

              {/* Inputs */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-medium">Name</label>
                  <input
                    {...register("name")}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Email</label>
                  <input
                    {...register("email")}
                    disabled
                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">District</label>
                  <input
                    {...register("district")}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-medium">Upazila</label>
                  <input
                    {...register("upazila")}
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
                    defaultValue={donor.bloodGroup || "A+"}
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
