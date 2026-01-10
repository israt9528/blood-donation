import { FiUserPlus, FiClipboard, FiHeart, FiSmile } from "react-icons/fi";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Register as Donor",
    description:
      "Create your Pulse account and provide basic details like blood group and location.",
    icon: <FiUserPlus className="w-7 h-7" />,
  },
  {
    id: 2,
    title: "Health Screening",
    description:
      "We verify eligibility through simple health questions to ensure safe donation.",
    icon: <FiClipboard className="w-7 h-7" />,
  },
  {
    id: 3,
    title: "Donate Blood",
    description:
      "Visit the assigned center or emergency location and donate blood safely.",
    icon: <FiHeart className="w-7 h-7" />,
  },
  {
    id: 4,
    title: "Save Lives",
    description:
      "Your donation helps patients in need and brings hope to families.",
    icon: <FiSmile className="w-7 h-7" />,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section className=" py-10 pb-20">
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
            How <span className="text-red-500">Pulse</span> Works
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Donating blood through Pulse is simple, safe, and impactful. Follow
            these easy steps to save lives.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              {/* Step Number */}
              <span className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
                {step.id}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
