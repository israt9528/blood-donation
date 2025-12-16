// Banner.jsx – Animated Pulse + Heartbeat Ripple + Mobile Tight UI
import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Search } from "lucide-react";
import banner from "../../../assets/banner.jpeg";
import { Link } from "react-router";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#fff1f2]">
      {/* Light red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-red-50 to-pink-100" />

      {/* Ambient glow */}
      <div className="absolute -top-28 -left-28 w-[380px] h-[380px] bg-rose-300/40 rounded-full blur-[120px]" />
      <div className="absolute -bottom-28 -right-28 w-[380px] h-[380px] bg-red-200/40 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-slate-900"
          >
            <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 text-[11px] font-semibold rounded-full bg-white/70 backdrop-blur border border-rose-200">
              🩸 Save Lives Together
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight">
              Be Someone&apos;s{" "}
              <span className="relative text-primary">
                Pulse
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0.85, 1] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="origin-left absolute -bottom-1 left-0 w-full h-1 bg-rose-300/80 rounded-full"
                />
              </span>
              <br className="hidden sm:block" /> of Life
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-700 max-w-xl">
              A trusted platform connecting blood donors and patients. Donate
              blood or instantly find verified donors near you.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth/register"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-rose-500/40 transition"
                >
                  <HeartPulse className="w-4 h-4" />
                  Join as Donor
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/search-donors"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-300 text-rose-700 px-5 py-2.5 text-sm font-semibold hover:bg-rose-100 transition"
                >
                  <Search className="w-4 h-4" />
                  Search Donor
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE + HEARTBEAT RIPPLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Heartbeat ripple */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.15, 0.35] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-rose-400/30 blur-3xl"
            />

            <img
              src={banner}
              alt="Blood Donation"
              className="relative w-full max-w-md rounded-2xl shadow-xl object-cover border border-white/60"
            />
          </motion.div>
        </div>

        {/* BLOOD GROUP BADGES */}
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {bloodGroups.map((group) => (
            <span
              key={group}
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold
                bg-white/70 backdrop-blur-md border border-rose-200
                text-rose-600 shadow-sm transition
                hover:bg-rose-500 hover:text-white hover:shadow-rose-500/40"
            >
              {group}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
