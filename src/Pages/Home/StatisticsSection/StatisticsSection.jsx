import { motion } from "framer-motion";
import { FiUsers, FiHeart, FiMapPin, FiActivity } from "react-icons/fi";

const stats = [
  {
    id: 1,
    label: "Registered Donors",
    value: "12,500+",
    icon: <FiUsers />,
  },
  {
    id: 2,
    label: "Lives Saved",
    value: "8,200+",
    icon: <FiHeart />,
  },
  {
    id: 3,
    label: "Partner Hospitals",
    value: "120+",
    icon: <FiMapPin />,
  },
  {
    id: 4,
    label: "Emergency Requests",
    value: "3,400+",
    icon: <FiActivity />,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function StatisticsSection() {
  return (
    <section className="py-20 bg-slate-50">
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
            Our <span className="text-red-500">Impact</span> in Numbers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Every number represents a life touched. Together, we are making a
            real difference.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.04 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 text-2xl">
                {stat.icon}
              </div>

              {/* Value */}
              <h3 className="text-3xl font-bold text-slate-800 mb-2">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
