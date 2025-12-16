// FeaturedSection.jsx – Heartbeat Line + Blood Drop Particles
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, MapPin } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: "Donate Blood Easily",
    description:
      "Quickly register and donate blood to save lives in your community.",
  },
  {
    icon: <Users className="w-6 h-6 text-red-500" />,
    title: "Find Donors Instantly",
    description:
      "Search for verified blood donors by location and blood group in minutes.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-red-500" />,
    title: "Location Based Help",
    description:
      "Get real-time notifications and assistance for blood requests near you.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="relative bg-white/5 py-16 sm:py-20 px-6 sm:px-10 overflow-hidden">
      {/* Heartbeat line animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-red-500 to-pink-400"
        animate={{ scaleX: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tiny blood drop particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], x: [0, 5, -5, 0] }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute w-2 h-2 bg-red-500 rounded-full opacity-50 blur-sm`}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90 + 5}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Why Choose Our Platform
        </h2>
        <p className="mt-4 text-slate-700 text-base sm:text-lg max-w-2xl mx-auto">
          Connecting donors and patients efficiently. Save lives with a simple
          act.
        </p>
      </div>

      <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center text-center p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur transition-transform hover:scale-105 hover:shadow-red-300/40 cursor-pointer"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-700 text-sm sm:text-base">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
