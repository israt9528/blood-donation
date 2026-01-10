import { motion } from "framer-motion";
import { FiUserPlus, FiAlertCircle, FiDroplet } from "react-icons/fi";
import { Link } from "react-router";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-12 bg-red-600">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-12 -left-12 w-[300px] h-[300px] bg-red-400 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-12 -right-12 w-[400px] h-[400px] bg-white rounded-full blur-[80px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="flex flex-col items-center">
          {/* Small Compact Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium mb-4 backdrop-blur-md"
          >
            <FiDroplet className="text-red-200 animate-pulse" />
            <span>10,000+ lives saved</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            {/* Heading - Reduced scale */}
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              One Donation,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                Infinite Impact
              </span>
            </h2>

            {/* Subtitle - Narrower and smaller margin */}
            <p className="max-w-xl mx-auto text-red-50 text-base md:text-lg leading-relaxed mb-8 opacity-90">
              Join Pulse to donate or request blood instantly. We connect heroes
              with those in need through a seamless, fast emergency network.
            </p>

            {/* Buttons - Slightly smaller padding */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/auth/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-red-600 font-bold text-base shadow-lg hover:bg-red-50 transition-all"
                >
                  <FiUserPlus className="text-xl transition-transform group-hover:rotate-12" />
                  Become a Donor
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/auth/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                >
                  <FiAlertCircle className="text-xl" />
                  Request Blood
                </Link>
              </motion.div>
            </div>

            {/* Compact Feature Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                <span className="text-sm font-bold uppercase tracking-wider text-red-100">
                  100% Free
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                <span className="text-sm font-bold uppercase tracking-wider text-red-100">
                  Verified Donors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                <span className="text-sm font-bold uppercase tracking-wider text-red-100">
                  Instant Response
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
