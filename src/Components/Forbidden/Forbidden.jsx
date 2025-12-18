import React from "react";
import { motion } from "framer-motion";
import { HiOutlineShieldExclamation } from "react-icons/hi";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-slate-900/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* Error Code Branding */}
        <div className="relative inline-block mb-8">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-[12rem] md:text-[15rem] font-black text-slate-900/5 leading-none select-none"
          >
            403
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 md:p-8 bg-white rounded-[2.5rem] shadow-2xl shadow-red-200/50 border border-slate-100 group">
              <HiOutlineShieldExclamation className="text-6xl md:text-8xl text-red-600 group-hover:rotate-12 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Access <span className="text-red-600 font-black">Forbidden</span>
          </h2>

          <div className="max-w-md mx-auto">
            <p className="text-slate-500 font-medium leading-relaxed">
              It seems you've stumbled into a restricted sector. Your current
              clearance level does not allow access to this resource.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              <FaArrowLeft /> Go Back
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-red-500 hover:text-red-600 transition-all"
            >
              <FaHome /> Return Home
            </Link>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 max-w-xs mx-auto">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Shield Security Protocol Active
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
