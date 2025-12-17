// FeaturedSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, MapPin, ShieldCheck, Bell, Clock } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: "Donate Blood Easily",
    description:
      "Quickly register and donate blood to save lives in your community.",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116ecaaba30?auto=format&fit=crop&q=80&w=500",
  },
  {
    icon: <Users className="w-6 h-6 text-red-500" />,
    title: "Find Donors Instantly",
    description:
      "Search for verified blood donors by location and blood group in minutes.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500",
  },
  {
    icon: <MapPin className="w-6 h-6 text-red-500" />,
    title: "Location Based Help",
    description:
      "Get real-time notifications and assistance for blood requests near you.",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=500",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
    title: "Verified Requests",
    description:
      "All blood requests are verified by our team to ensure genuine emergencies.",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=500",
  },
  {
    icon: <Bell className="w-6 h-6 text-red-500" />,
    title: "Emergency Alerts",
    description:
      "Receive urgent push notifications when your blood type is needed nearby.",
    image:
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=500",
  },
  {
    icon: <Clock className="w-6 h-6 text-red-500" />,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock for any assistance.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500",
  },
];

export default function FeaturedSection() {
  return (
    <section className="relative bg-slate-50 py-16 sm:py-24 px-6 sm:px-10 overflow-hidden">
      {/* Heartbeat line animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-red-600 to-pink-500"
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blood drop particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-3 h-3 bg-red-500 rounded-full blur-[2px] pointer-events-none"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 95}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight"
        >
          Why Choose Our Platform
        </motion.h2>
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          We bridge the gap between those who can help and those in need. Your
          contribution can be the pulse of a new life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group flex flex-col bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 transition-all hover:shadow-red-200/50"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-medium uppercase tracking-widest">
                  Learn More
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-red-50 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 text-red-500">
                {React.cloneElement(feature.icon, {
                  className: "w-8 h-8 transition-colors duration-300",
                })}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
