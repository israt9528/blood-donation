import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
  IoMail,
  IoLockClosed,
  IoPerson,
  IoWater,
  IoMap,
  IoCloudUpload,
  IoArrowBack,
} from "react-icons/io5";
import Logo from "../../../Components/Shared/Logo/Logo";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const districtsData = useLoaderData();
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilasInfo.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const districts = districtsData?.map((d) => d.name) || [];
  const selectedDistrict = watch("district");

  const getDistrictId = (name) => {
    const found = districtsData.find((d) => d.name === name);
    return found ? found.id : null;
  };

  const upazilasByDistrict = selectedDistrict
    ? upazilas.filter((u) => u.district_id === getDistrictId(selectedDistrict))
    : [];

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password).then((res) => {
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_api_url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_api
      }`;

      axios.post(image_api_url, formData).then((imgRes) => {
        const imageUrl = imgRes.data.data.url;
        const donorInfo = {
          name: data.name,
          email: data.email,
          image: imageUrl,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
          role: "donor",
          status: "active",
          createdAt: new Date(),
        };

        axiosSecure.post("/donors", donorInfo).then(() => {
          updateUser({ displayName: data.name, photoURL: imageUrl }).then(() =>
            navigate(location?.state || "/")
          );
        });
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
      {/* Floating Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-bold text-sm"
      >
        <IoArrowBack /> Back to Home
      </Link>

      <div className="max-w-6xl w-full grid lg:grid-cols-12 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-white">
        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <div className="lg:col-span-5 relative hidden lg:block bg-slate-900 overflow-hidden p-12">
          <div className="absolute inset-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2000&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Medical background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
          </div>

          <div className="relative h-full flex flex-col justify-between z-10">
            <Logo />
            <div>
              <h2 className="text-4xl font-black text-white leading-tight mb-6">
                Start Your <br />
                <span className="text-red-500">Lifesaving</span> Journey
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                By creating an account, you join a global network of heroes
                dedicated to saving lives through blood donation.
              </p>
            </div>
            <div className="flex items-center gap-4 text-white/50 text-sm italic">
              <span className="w-12 h-[1px] bg-white/20"></span>
              Verified & Secure Platform
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16">
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden mb-6 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 font-medium">
              Join the PULSE community today.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <div className="relative">
                  <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none text-slate-700"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1">Required</span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none text-slate-700"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1">Required</span>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Blood Group */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  Blood Group
                </label>
                <div className="relative">
                  <IoWater className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                  <select
                    {...register("bloodGroup", { required: true })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl appearance-none focus:bg-white transition-all outline-none text-slate-700"
                  >
                    <option value="">Select</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* District */}
              <div className="form-control sm:col-span-2">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  District / Upazila
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    {...register("district", { required: true })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl appearance-none text-sm outline-none focus:bg-white"
                  >
                    <option value="">District</option>
                    {districts.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("upazila", { required: true })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl appearance-none text-sm outline-none focus:bg-white"
                  >
                    <option value="">Upazila</option>
                    {upazilasByDistrict.map((u, i) => (
                      <option key={i} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                Profile Photo
              </label>
              <div className="relative group">
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-4 py-3.5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-400 group-hover:border-red-400 group-hover:bg-red-50/30 transition-all">
                  <IoCloudUpload className="text-xl" />
                  <span className="text-sm font-medium">
                    Click to upload image
                  </span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Password */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (val) =>
                        val === watch("password") || "Mismatch",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-[0.98] mt-4">
              Create Account
            </button>

            <p className="text-center text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-red-600 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
