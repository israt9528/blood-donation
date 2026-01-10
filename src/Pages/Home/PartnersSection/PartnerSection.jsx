import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";

// Dummy partner data (replace logos with real ones later)
const partners = [
  { name: "City Hospital", logo: "🏥" },
  { name: "LifeCare Blood Bank", logo: "🩸" },
  { name: "Red Crescent", logo: "❤️" },
  { name: "HealthAid Foundation", logo: "🤝" },
  { name: "Medico Plus", logo: "💊" },
  { name: "Community Care", logo: "🏥" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-slate-800">
            Our <span className="text-red-500">Partners</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            We proudly collaborate with hospitals, blood banks, and
            organizations to ensure safe and timely blood donations.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-6 bg-slate-50 hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <p className="text-sm font-semibold text-slate-700 text-center">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: false }}
          className="mt-14 text-center"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition">
            <FiPlusCircle />
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
}
