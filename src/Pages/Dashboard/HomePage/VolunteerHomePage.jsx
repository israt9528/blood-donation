import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaTint,
  FaArrowUp,
  FaClipboardList,
} from "react-icons/fa";
import { HiOutlineHeart, HiOutlineLightningBolt } from "react-icons/hi";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const VolunteerHomePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /* Fetch Requests */
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/all");
      return res.data;
    },
  });

  /* Fetch Users / Donors */
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
  const recentRequests = requests.slice(0, 3);

  const stats = [
    {
      title: "Community Members",
      value: donorsLoading ? "..." : donors.length,
      icon: <FaUsers />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      label: "Total Registered",
    },
    {
      title: "Community Funds",
      value: fundingLoading ? "..." : `$${totalFund.toLocaleString()}`,
      icon: <FaHandHoldingHeart />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      label: "Verified Total",
    },
    {
      title: "All Requests",
      value: requestsLoading ? "..." : requests.length,
      icon: <FaTint />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      label: "Current Donation Flow",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* Volunteer Welcome Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-red-400 mb-4">
              <HiOutlineHeart size={20} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Volunteer Portal
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Hello,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-200">
                {user?.displayName?.split(" ")[0]}
              </span>
            </h1>
            <p className="mt-4 max-w-md text-slate-400 font-medium leading-relaxed italic">
              "Every drop counts. Your management ensures that every request
              finds its donor."
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
                  Active Duty
                </p>
                <p className="text-xl font-black uppercase">Volunteer Mode</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-black uppercase bg-emerald-50 px-2 py-1 rounded-lg">
                <FaArrowUp size={8} /> LIVE
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {stat.title}
              </p>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                {stat.value}
              </h2>
              <p className="text-[11px] font-bold text-slate-400 mt-2">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Layout: Activity Feed & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Requests Feed */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                <FaClipboardList />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Recent Donation Flows
              </h3>
            </div>
            <Link
              to="/dashboard/all-blood-donation-request"
              className="text-[10px] font-black uppercase text-red-500 hover:underline"
            >
              Manage All
            </Link>
          </div>

          <div className="space-y-4">
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="flex items-center justify-between p-5 rounded-[1.5rem] border border-slate-50 hover:bg-slate-50/80 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">
                    {req.bloodGroup}
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">
                      {req.recipientName}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      {req.recipientUpazila}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                    {req.donationStatus}
                  </span>
                  <p className="text-[10px] font-bold text-slate-300 mt-1">
                    {req.donationDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links for Volunteers */}
        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8">
          <h3 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-tighter">
            Quick Access
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Review Requests",
                link: "/dashboard/all-blood-donation-request/volunteer",
              },
              { label: "Funding Activity", link: "/funding" },
            ].map((btn) => (
              <Link
                key={btn.label}
                to={btn.link}
                className="block w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs font-black text-slate-600 hover:text-red-600 hover:border-red-400 hover:shadow-md transition-all uppercase tracking-widest text-center"
              >
                {btn.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 text-white text-center shadow-lg shadow-red-200">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
              Need Assistance?
            </p>
            <p className="text-xs font-bold leading-relaxed mb-4">
              Contact Admin for system permissions or data corrections.
            </p>
            <button className="text-[10px] font-black uppercase bg-white text-red-600 px-4 py-2 rounded-xl">
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHomePage;
