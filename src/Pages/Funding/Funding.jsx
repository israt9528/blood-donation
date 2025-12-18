import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { FaDollarSign, FaHistory, FaPlusCircle } from "react-icons/fa"; // Optional: icons make it pop

const Funding = () => {
  const fundModalRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: funds = [], isLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure("/funds");
      return res.data;
    },
  });

  const openFundModal = () => {
    fundModalRef.current.showModal();
  };

  const handleGiveFund = async (data) => {
    const fundInfo = {
      name: data.name,
      email: user.email,
      amount: data.amount,
    };
    const res = await axiosSecure.post("/create-checkout-session", fundInfo);

    reset(); // Clear form after submission
    fundModalRef.current.close();
    window.location.href = res.data.url;
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-30">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl p-8 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Support Our Mission</h1>
          <p className="opacity-90 max-w-md">
            Your contributions help us grow and provide better services to the
            community. View the history of our generous donors below.
          </p>
        </div>
        <button
          onClick={openFundModal}
          className="btn btn-lg bg-white border-none shadow-lg hover:scale-105 transition-transform"
        >
          <FaPlusCircle className="mr-2" /> Give Fund Now
        </button>
      </div>

      {/* Main Content: Funding History */}
      <div className="bg-base-100 shadow-sm border border-base-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-base-200 flex items-center gap-2">
          <FaHistory className="text-primary" />
          <h2 className="text-xl font-semibold">Funding History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead className="bg-base-200">
              <tr className="text-base uppercase tracking-wider">
                <th>#</th>
                <th>Donor Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {funds.length > 0 ? (
                funds.map((f, i) => (
                  <tr
                    key={i}
                    className="hover:bg-base-200/50 transition-colors"
                  >
                    <th className="font-medium text-base-content/50">
                      {i + 1}
                    </th>
                    <td className="font-medium">{f.senderName}</td>
                    <td>
                      <span className="badge badge-success badge-outline font-bold">
                        ${f.amount}
                      </span>
                    </td>
                    <td className="text-base-content/70">
                      {new Date(f.giveAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-base-content/50"
                  >
                    No contributions found yet. Be the first to donate!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Dialog Modal */}
      <dialog ref={fundModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 overflow-hidden">
          <div className="bg-primary p-6 text-primary-content">
            <h3 className="font-bold text-2xl flex items-center gap-2">
              <FaDollarSign /> Make a Contribution
            </h3>
            <p className="text-sm opacity-80 mt-1">
              Enter your details and the amount you wish to fund.
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(handleGiveFund)} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className="input input-bordered focus:input-primary w-full transition-all"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Amount ($)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-base-content/40">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    {...register("amount", { required: true, min: 1 })}
                    className="input input-bordered focus:input-primary w-full pl-8 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button type="submit" className="btn btn-primary flex-1">
                  Proceed to Checkout
                </button>
                <form method="dialog" className="flex-1">
                  <button className="btn btn-outline w-full">Cancel</button>
                </form>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;
