import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Funding = () => {
  const fundModalRef = useRef();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: funds = [] } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure("/funding");
      return res.data;
    },
  });
  console.log(funds);

  const openFundModal = () => {
    fundModalRef.current.showModal();
  };

  const handleGiveFund = async (data) => {
    console.log(data);
    const fundInfo = {
      name: data.name,
      email: user.email,
      amount: data.amount,
    };
    const res = await axiosSecure.post("/create-checkout-session", fundInfo);

    console.log(res.data);
    fundModalRef.current.close();
    window.location.href = res.data.url;
  };

  return (
    <div>
      <button onClick={openFundModal} className="btn">
        give fund
      </button>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((f, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{f.senderName}</td>
                <td>{f.amount}</td>
                <td>{new Date(f.giveAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={fundModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Donor</h3>
          <div className="overflow-x-auto p-5">
            <form onSubmit={handleSubmit(handleGiveFund)} className="space-y-4">
              <div className="form-control">
                <label className="label font-medium">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label font-medium">Amount ($)</label>
                <input
                  type="number"
                  {...register("amount")}
                  className="input input-bordered w-full"
                />
              </div>

              <button className="btn">Confirm</button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;
