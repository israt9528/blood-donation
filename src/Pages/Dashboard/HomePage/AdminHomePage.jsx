import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

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

  /* Stats AFTER data fetching */
  const stats = [
    {
      title: "Total Users",
      value: donorsLoading ? "..." : donors.length,
      icon: <FaUsers className="text-4xl" />,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Total Funding",
      value: fundingLoading ? "..." : `$${totalFund.toLocaleString()}`,
      icon: <FaHandHoldingHeart className="text-4xl" />,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Blood Donation Requests",
      value: requestsLoading ? "..." : requests.length,
      icon: <FaTint className="text-4xl" />,
      gradient: "from-rose-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 md:px-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 rounded-2xl bg-linear-to-r from-primary to-secondary p-6 text-white shadow-lg md:p-10"
      >
        <h1 className="text-2xl font-bold md:text-4xl">
          Welcome Back, {user.displayName}👋
        </h1>
        <p className="mt-2 max-w-2xl text-sm opacity-90 md:text-base">
          Manage users, monitor funding activity, and track blood donation
          requests from your dashboard.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04 }}
            className="relative overflow-hidden rounded-2xl bg-base-100 p-6 shadow-md"
          >
            {/* Gradient Glow */}
            <div
              className={`absolute inset-0 -z-10 bg-linear-to-br ${stat.gradient} opacity-10`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h2 className="mt-1 text-3xl font-bold text-base-content">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${stat.gradient} text-white shadow`}
              >
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
