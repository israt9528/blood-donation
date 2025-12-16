import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

/* Skeleton */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-gray-300/60 ${className}`} />
);

/* Card animation */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AdminHomePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /* Requests */
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/all");
      return res.data;
    },
  });

  /* Users */
  const { data: donors = [], isLoading: donorsLoading } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors");
      return res.data;
    },
  });

  /* Funds */
  const { data: funds = [], isLoading: fundingLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure("/funds");
      return res.data;
    },
  });

  const totalFund = funds.reduce((sum, f) => sum + Number(f.amount), 0);

  /* Dummy chart aggregation (replace later if backend provides analytics) */
  const donationStats = [
    { name: "Mon", daily: 5, weekly: 22, monthly: 90 },
    { name: "Tue", daily: 8, weekly: 30, monthly: 120 },
    { name: "Wed", daily: 6, weekly: 28, monthly: 110 },
    { name: "Thu", daily: 10, weekly: 40, monthly: 150 },
    { name: "Fri", daily: 7, weekly: 35, monthly: 130 },
    { name: "Sat", daily: 12, weekly: 50, monthly: 170 },
    { name: "Sun", daily: 9, weekly: 45, monthly: 160 },
  ];

  const stats = [
    {
      title: "Total Users",
      value: donors.length,
      loading: donorsLoading,
      icon: <FaUsers />,
      gradient: "from-red-500 to-rose-500",
    },
    {
      title: "Total Funding",
      value: `৳ ${totalFund.toLocaleString()}`,
      loading: fundingLoading,
      icon: <FaHandHoldingHeart />,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Blood Requests",
      value: requests.length,
      loading: requestsLoading,
      icon: <FaTint />,
      gradient: "from-red-600 to-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 md:px-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12 overflow-hidden rounded-3xl
  bg-linear-to-br from-red-600 via-rose-500 to-orange-500
  p-6 text-white shadow-2xl md:p-10"
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10">
          <h1 className="text-2xl font-bold md:text-4xl">
            Welcome back, {user?.displayName} 👋
          </h1>
          <p className="mt-4 max-w-2xl text-sm opacity-95 md:text-base leading-relaxed">
            Here’s a quick overview of today’s activity. Manage donors, monitor
            funding, and respond to blood donation requests — all from one
            powerful dashboard.
          </p>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -6, scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl
            bg-white/80 backdrop-blur-xl p-6 shadow-lg"
          >
            <div
              className={`absolute -inset-1 -z-10 bg-linear-to-br ${stat.gradient} opacity-15 blur-2xl`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  {stat.title}
                </p>

                {stat.loading ? (
                  <Skeleton className="mt-3 h-8 w-24" />
                ) : (
                  <h2 className="mt-2 text-3xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                )}
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl
                bg-linear-to-br ${stat.gradient} text-white text-2xl shadow-lg`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-xl"
      >
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Donation Requests Overview
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={donationStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="daily"
                stroke="#ef4444"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="weekly"
                stroke="#f97316"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="monthly"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHomePage;
