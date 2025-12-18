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
  AreaChart,
  Area,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

/* Skeleton */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

/* Card animation */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
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

  /* Dummy chart aggregation */
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
      gradient: "from-slate-800 to-slate-900",
      accent: "text-slate-600",
    },
    {
      title: "Total Funding",
      value: `$${totalFund.toLocaleString()}`,
      loading: fundingLoading,
      icon: <FaHandHoldingHeart />,
      gradient: "from-red-600 to-rose-700",
      accent: "text-red-600",
    },
    {
      title: "Blood Requests",
      value: requests.length,
      loading: requestsLoading,
      icon: <FaTint />,
      gradient: "from-red-500 to-orange-500",
      accent: "text-orange-600",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
      {/* Welcome Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-700 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-red-200/50 group"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            System Overview
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-200">
              {user?.displayName?.split(" ")[0] || "Admin"}
            </span>
          </h1>
          <p className="text-red-50/80 max-w-xl font-medium text-sm md:text-base leading-relaxed">
            Your management tools are ready. Monitor real-time donor growth,
            funding accumulation, and urgent blood request status.
          </p>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {stat.title}
                </p>
                {stat.loading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                    {stat.value}
                  </h2>
                )}
              </div>
              <div
                className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg group-hover:rotate-12 transition-transform duration-300`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
            {/* Subtle decorative circle */}
            <div
              className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-[0.03]`}
            />
          </motion.div>
        ))}
      </div>

      {/* Analytics Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Donation Performance
            </h2>
            <p className="text-slate-400 text-sm font-medium italic">
              Visualizing request trends across Daily, Weekly, and Monthly
              cycles
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Daily
            </span>
            <span className="flex items-center gap-1.5 text-orange-500">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>{" "}
              Weekly
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              Monthly
            </span>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={donationStats}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <defs>
                <filter id="shadow" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="5"
                    stdDeviation="3"
                    floodOpacity="0.1"
                  />
                </filter>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "1.5rem",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  fontWeight: "800",
                }}
              />
              <Line
                type="monotone"
                dataKey="daily"
                stroke="#ef4444"
                strokeWidth={4}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4, stroke: "#fff" }}
                activeDot={{ r: 8, filter: "url(#shadow)" }}
              />
              <Line
                type="monotone"
                dataKey="weekly"
                stroke="#f97316"
                strokeWidth={4}
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4, stroke: "#fff" }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="monthly"
                stroke="#10b981"
                strokeWidth={4}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "#fff" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHomePage;
