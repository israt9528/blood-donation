// ContactUsClean.jsx – Professional Contact Section without Image
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUsClean() {
  return (
    <section className="relative bg-[#fff1f2] py-16 sm:py-20 px-6 sm:px-10 overflow-hidden">
      {/* Floating blood drops */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -15, 0], x: [0, 5, -5, 0] }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-50 blur-sm"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 95}%`,
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Section Title & Description */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Contact Us
          </h2>
          <p className="mt-4 text-slate-700 text-base sm:text-lg max-w-2xl mx-auto">
            We’re here to answer your questions and provide support. Reach out
            through the form or via our contact info below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white/10 backdrop-blur-md p-8 pt-10 rounded-3xl shadow-lg flex flex-col gap-4"
          >
            {/* Heartbeat line above form */}
            <motion.div
              className="absolute -top-6 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-red-500 to-pink-400 rounded-full opacity-40"
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-white/70 backdrop-blur"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-white/70 backdrop-blur"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-white/70 backdrop-blur"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-white/70 backdrop-blur resize-none"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-rose-400/40 transition"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            {[
              {
                icon: <Mail />,
                title: "Email",
                text: "contact@blooddonate.com",
              },
              { icon: <Phone />, title: "Phone", text: "+880 1234 567890" },
              { icon: <MapPin />, title: "Address", text: "Dhaka, Bangladesh" },
            ].map((info, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow hover:shadow-rose-300/40 transition cursor-pointer"
              >
                <div className="w-6 h-6 text-red-500 mt-1">{info.icon}</div>
                <div>
                  <h4 className="font-semibold text-slate-900">{info.title}</h4>
                  <p className="text-slate-700 text-sm">{info.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
