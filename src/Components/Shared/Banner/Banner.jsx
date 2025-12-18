// Banner.jsx
import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Search, ArrowRight, ShieldCheck } from "lucide-react";
// import banner from "../../../assets/banner.jpeg";
import { Link } from "react-router-dom";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function Banner() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50 pt-24 lg:pt-16">
      {/* Sophisticated Light Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft radial glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-red-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[30%] bg-blue-50/60 rounded-full blur-[80px]" />
        {/* Subtle geometric grid */}
        <div
          className="absolute inset-0 opacity-[0.4] [mask-image:linear-gradient(to_bottom,white,transparent)]"
          style={{
            backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Emergency Network
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Be the Reason <br />
              <span className="text-red-600">A Heart Keeps</span> <br />
              Beating.
            </h1>

            <p className="text-slate-600 text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
              PULSE connects you with verified blood donors in real-time. A
              simple act of kindness can gift someone a lifetime.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/auth/register"
                  className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-red-600 transition-all group"
                >
                  <HeartPulse className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Join as Donor
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/search-donors"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:border-red-200 hover:bg-red-50/30 transition-all group shadow-sm"
                >
                  <Search className="w-5 h-5 text-red-600" />
                  Find Donors
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* REFINED BLOOD GROUP SELECTOR */}
            <div className="pt-8 border-t border-slate-200/60">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {bloodGroups.map((group) => (
                  <motion.div
                    key={group}
                    whileHover={{ y: -4 }}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-red-500 hover:text-red-600 hover:shadow-lg hover:shadow-red-500/10 cursor-pointer transition-all"
                  >
                    {group}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Visual Frame */}
            <div className="relative p-3 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
              <div className="overflow-hidden rounded-[2rem] relative">
                <img
                  src="https://wockhardthospitals.com/wp-content/uploads/2020/01/shutterstock_264395594-1-768x768-1.webp"
                  alt="Pulse Donation"
                  className="w-full max-w-lg h-[450px] md:h-[550px] object-cover"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>

              {/* Floating Verified Badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50 hidden md:flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">
                    100% Verified
                  </p>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tight">
                    Donor Profiles
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
