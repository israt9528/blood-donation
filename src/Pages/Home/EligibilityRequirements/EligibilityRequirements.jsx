import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiClock, FiUser } from "react-icons/fi";

const eligibilityRules = [
  {
    id: 1,
    title: "Age Requirement",
    description: "Donors must be between 18 and 60 years old.",
    icon: <FiUser />,
  },
  {
    id: 2,
    title: "Minimum Weight",
    description: "Minimum body weight should be at least 50 kg.",
    icon: <FiCheckCircle />,
  },
  {
    id: 3,
    title: "Donation Interval",
    description: "A gap of at least 3 months between donations is required.",
    icon: <FiClock />,
  },
  {
    id: 4,
    title: "Temporary Restrictions",
    description: "Recent illness, surgery, or medication may delay donation.",
    icon: <FiXCircle />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export default function EligibilityRequirements() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
            Eligibility & <span className="text-red-500">Requirements</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Please review the basic eligibility criteria before registering as a
            blood donor on Pulse.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {eligibilityRules.map((rule) => (
            <motion.div
              key={rule.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-2xl p-8 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 text-2xl">
                {rule.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                {rule.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {rule.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Final eligibility is determined after medical screening at the
            donation center.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
