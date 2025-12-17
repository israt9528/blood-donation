import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import {
  IoMail,
  IoLockClosed,
  IoArrowBack,
  IoChevronForward,
  IoWarningOutline, // Added Warning Icon
} from "react-icons/io5";
import Logo from "../../../Components/Shared/Logo/Logo";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (data) => {
    setError(""); // Clear previous errors
    loginUser(data.email, data.password)
      .then((res) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        // Cleaning up Firebase error messages (e.g., "auth/invalid-credential")
        const friendlyError = error.message.includes("invalid-credential")
          ? "Invalid email or password. Please try again."
          : error.message;
        setError(friendlyError);
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

      <div className="max-w-5xl w-full grid lg:grid-cols-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-white">
        {/* Left Side: Visual/Branding */}
        <div className="lg:col-span-4 relative hidden lg:block bg-slate-900 overflow-hidden p-12">
          <div className="absolute inset-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1536856424748-5c163610d1d1?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Healthcare login"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          </div>

          <div className="relative h-full flex flex-col justify-between z-10">
            <Logo />
            <div>
              <h2 className="text-3xl font-black text-white leading-tight mb-4">
                Welcome <br />
                <span className="text-red-500">Back</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Log in to manage your donations, track requests, and stay
                connected with the pulse of your community.
              </p>
            </div>
            <div className="flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-white/20"></span>
              Pulse Safety Protocols Active
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <div className="lg:hidden mb-6 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Sign In</h1>
            <p className="text-slate-500 font-medium">
              Please enter your credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* --- ERROR MESSAGE SECTION --- */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3 mb-2"
                >
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <IoWarningOutline className="text-red-600 text-xl" />
                  </div>
                  <p className="text-sm font-semibold text-red-800">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl focus:bg-white focus:ring-4 transition-all outline-none text-slate-700 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500/5 focus:border-red-500"
                      : "border-slate-100 focus:ring-red-500/5 focus:border-red-500"
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 font-medium italic">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <div className="flex justify-between items-center px-1">
                <label className="label text-xs font-bold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-tighter"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl focus:bg-white focus:ring-4 transition-all outline-none text-slate-700 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500/5 focus:border-red-500"
                      : "border-slate-100 focus:ring-red-500/5 focus:border-red-500"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <span className="text-xs text-red-500 mt-1 font-medium italic">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button className="w-full py-4 bg-slate-900 hover:bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group mt-2">
              Sign In
              <IoChevronForward className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Registration Link */}
            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 font-medium text-sm">
                Don't have an account yet?{" "}
                <Link
                  to="/auth/register"
                  state={location.state}
                  className="text-red-600 font-bold hover:text-red-700 hover:underline transition-all"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
