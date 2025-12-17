// ContactUsClean.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactUsClean() {
  return (
    <section className="relative bg-slate-50 py-20 sm:py-28 px-6 lg:px-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-200/30 rounded-full blur-[100px]" />
      </div>

      {/* Floating Blood Drop Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -40, 0],
            x: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-2.5 h-2.5 bg-red-500 rounded-full blur-[1px]"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 95}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-6"
          >
            Let's Start a <span className="text-red-600">Conversation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about blood donation or need help finding a donor?
            Our team is ready to support you 24/7.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Cards - Takes 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email Us",
                text: "support@lifeblood.org",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Call Anytime",
                text: "+880 1234 567-890",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Our Headquarters",
                text: "12/A Heart Avenue, Dhaka, BD",
                color: "bg-red-50 text-red-600",
              },
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-5 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
              >
                <div
                  className={`p-4 rounded-2xl ${info.color} group-hover:scale-110 transition-transform`}
                >
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {info.title}
                  </h4>
                  <p className="text-slate-500 font-medium">{info.text}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="mt-4 p-6">
              <h4 className="text-slate-900 font-bold mb-4">
                Follow our impact:
              </h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{
                      y: -5,
                      backgroundColor: "#ef4444",
                      color: "#fff",
                    }}
                    className="w-12 h-12 flex items-center justify-center bg-white shadow-sm border border-slate-100 rounded-xl text-slate-600 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - Takes 7 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <form className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
              {/* Heartbeat Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-rose-400" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                />
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your request..."
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-red-600/30 transition-all flex items-center justify-center gap-3 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
