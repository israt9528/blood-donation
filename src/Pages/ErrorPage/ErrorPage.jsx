import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaSyncAlt } from "react-icons/fa";
import { BiSolidDroplet } from "react-icons/bi"; // Fixed icon name
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-[100px] opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-200 rounded-full blur-[100px] opacity-50" />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        {/* Animated Error Illustration */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <h1 className="text-[12rem] md:text-[20rem] font-black text-slate-900 leading-none tracking-tighter opacity-10">
              404
            </h1>
          </motion.div>

          {/* Floating Drop Icon */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-red-200 border border-slate-100 relative group">
              {/* Using the correct icon name here */}
              <BiSolidDroplet className="text-7xl md:text-9xl text-red-600 transition-transform group-hover:scale-110 duration-500" />
              <div className="absolute -bottom-2 right-8 w-12 h-12 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Page <span className="text-red-600">Disconnected</span>
          </h2>
          <p className="max-w-md mx-auto text-slate-500 font-medium leading-relaxed">
            We couldn't find the page you're looking for. It might have been
            moved, or the link might be broken—much like a missing donation
            request.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all duration-300 shadow-xl shadow-slate-200"
          >
            <FaHome /> Back to Safety
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-red-500 hover:text-red-600 transition-all duration-300"
          >
            <FaSyncAlt /> Retry Connection
          </button>
        </motion.div>

        {/* Subtle Brand Logo/Text */}
        <div className="mt-20 flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
          <span className="h-px w-8 bg-slate-400"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            BloodLine System
          </span>
          <span className="h-px w-8 bg-slate-400"></span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
