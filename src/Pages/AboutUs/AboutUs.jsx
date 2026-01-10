import { motion } from "framer-motion";
import { FiHeart, FiUsers, FiTarget, FiShield } from "react-icons/fi";
import { Link } from "react-router";

const values = [
  {
    title: "Our Mission",
    description:
      "To connect blood donors with patients quickly and safely, ensuring no life is lost due to blood unavailability.",
    icon: <FiHeart />,
  },
  {
    title: "Our Community",
    description:
      "A growing network of donors, hospitals, and volunteers working together to save lives.",
    icon: <FiUsers />,
  },
  {
    title: "Our Vision",
    description:
      "To become the most trusted blood donation platform, accessible to everyone, everywhere.",
    icon: <FiTarget />,
  },
  {
    title: "Trust & Safety",
    description:
      "We ensure verified donors, secure data handling, and medically guided donation processes.",
    icon: <FiShield />,
  },
];

export default function AboutUs() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 pt-30 bg-linear-to-r from-red-500 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About <span className="text-yellow-200">Pulse</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-red-100"
          >
            Pulse is a blood donation platform built to save lives by connecting
            donors, patients, and hospitals through technology.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Why Pulse Exists
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every day, patients face life-threatening situations due to the
              lack of timely blood availability. Pulse was created to bridge
              this gap by providing a fast, reliable, and transparent platform
              for blood donation and emergency requests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="bg-slate-50 rounded-2xl p-8"
          >
            <p className="text-slate-600">
              With role-based dashboards for donors, hospitals, and
              administrators, Pulse ensures every request is handled efficiently
              and responsibly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-slate-800">
              What <span className="text-red-500">Drives</span> Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              Our core values guide every decision we make.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 text-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Be Part of the <span className="text-red-500">Pulse</span>
          </h2>
          <p className="text-slate-600 mb-8">
            Whether you are a donor, a hospital, or a volunteer — your
            contribution can save lives.
          </p>
          <Link
            to="/auth/register"
            className="px-8 py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Join Pulse Today
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
