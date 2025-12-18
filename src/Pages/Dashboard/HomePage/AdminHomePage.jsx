import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaTint,
  FaArrowUp,
  FaChartLine,
} from "react-icons/fa";
import {
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import {
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

/* Skeleton Loader */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-2xl bg-slate-200/50 ${className}`} />
);

const AdminHomePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /* Data Fetching */
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/all");
      return res.data;
    },
  });

  const { data: donors = [], isLoading: donorsLoading } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors");
      return res.data;
    },
  });

  const { data: funds = [], isLoading: fundingLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure("/funds");
      return res.data;
    },
  });

  const totalFund = funds.reduce((sum, f) => sum + Number(f.amount), 0);

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
      title: "Active Users",
      value: donors.length,
      loading: donorsLoading,
      icon: <FaUsers />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      trend: "Community Base",
    },
    {
      title: "Total Funding",
      value: `$${totalFund.toLocaleString()}`,
      loading: fundingLoading,
      icon: <FaHandHoldingHeart />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "Verified Assets",
    },
    {
      title: "Blood Requests",
      value: requests.length,
      loading: requestsLoading,
      icon: <FaTint />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      trend: "Emergency Queue",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto min-h-screen bg-slate-50/30">
      {/* 1. Volunteer-Style Welcome Section (Administrative Version) */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 shadow-2xl">
        {/* Abstract Blur Blobs */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-red-400 mb-4">
              <HiOutlineShieldCheck size={20} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Administrative Portal
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Welcome back, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-200">
                {user?.displayName?.split(" ")[0] || "Admin"}
              </span>{" "}
              👋
            </h1>
            <p className="mt-4 max-w-lg text-slate-400 font-medium leading-relaxed italic">
              "Efficiency in management saves lives. Your oversight ensures the
              community's safety."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl"
          >
            <div className="flex items-center gap-4 text-white">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <HiOutlineLightningBolt size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Global Status
                </p>
                <p className="text-xl font-black uppercase tracking-tight">
                  Active Oversight
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase bg-emerald-50 px-2 py-1 rounded-lg">
                <FaArrowUp size={8} /> LIVE
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                {stat.title}
              </p>
              {stat.loading ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </h2>
              )}
              <p className="mt-4 text-[11px] font-bold text-slate-400">
                {stat.trend}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Analytics Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Platform Performance
            </h2>
            <p className="text-slate-400 text-sm font-medium italic">
              Data trends across core modules
            </p>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.1em]">
            <div className="flex items-center gap-2 text-red-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Daily
            </div>
            <div className="flex items-center gap-2 text-orange-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Weekly
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{" "}
              Monthly
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={donationStats}>
              <defs>
                <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
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
                dy={15}
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
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  padding: "1rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="daily"
                stroke="#ef4444"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorDaily)"
              />
              <Area
                type="monotone"
                dataKey="weekly"
                stroke="#fb923c"
                strokeWidth={4}
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="monthly"
                stroke="#10b981"
                strokeWidth={4}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHomePage;
