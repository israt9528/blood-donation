import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi";

const bloodTypes = [
  {
    type: "O−",
    donateTo: "All Blood Types",
    receiveFrom: "O−",
    highlight: true,
  },
  {
    type: "O+",
    donateTo: "O+, A+, B+, AB+",
    receiveFrom: "O−, O+",
  },
  {
    type: "A−",
    donateTo: "A−, A+, AB−, AB+",
    receiveFrom: "O−, A−",
  },
  {
    type: "A+",
    donateTo: "A+, AB+",
    receiveFrom: "O−, O+, A−, A+",
  },
  {
    type: "B−",
    donateTo: "B−, B+, AB−, AB+",
    receiveFrom: "O−, B−",
  },
  {
    type: "B+",
    donateTo: "B+, AB+",
    receiveFrom: "O−, O+, B−, B+",
  },
  {
    type: "AB−",
    donateTo: "AB−, AB+",
    receiveFrom: "O−, A−, B−, AB−",
  },
  {
    type: "AB+",
    donateTo: "AB+",
    receiveFrom: "All Blood Types",
    highlight: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function BloodTypeCompatibility() {
  return (
    <section className="py-20 bg-white transition-colors duration-300">
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
            Blood Type <span className="text-red-500">Compatibility</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Understanding blood type compatibility helps ensure safe and
            effective transfusions.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bloodTypes.map((blood) => (
            <motion.div
              key={blood.type}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`rounded-2xl p-6 border transition shadow-sm hover:shadow-lg \
                ${
                  blood.highlight
                    ? "border-red-500 bg-slate-800"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                }`}
            >
              {/* Blood Type */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white">
                  <FiDroplet />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {blood.type}
                </h3>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm">
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Can Donate To:
                  </span>{" "}
                  {blood.donateTo}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Can Receive From:
                  </span>{" "}
                  {blood.receiveFrom}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          O− is the universal donor, while AB+ is the universal recipient.
        </motion.p>
      </div>
    </section>
  );
}
