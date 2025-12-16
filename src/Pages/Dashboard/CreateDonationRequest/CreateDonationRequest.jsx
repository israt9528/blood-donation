import React from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donor = [] } = useQuery({
    queryKey: ["donor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors?email=${user?.email}`);
      return res.data[0];
    },
  });
  console.log(user);

  const handleCreateRequest = (data) => {
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send Request",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/requests", data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Submitted",
              text: "Your request has been submitted.",
              icon: "success",
            });
            reset();
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-red-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="card bg-white shadow-xl rounded-2xl overflow-hidden p-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 text-center">
            Blood Donation Request
          </h1>

          <form
            onSubmit={handleSubmit(handleCreateRequest)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Requester Name */}
              <div className="form-control">
                <label className="label font-medium">Requester Name</label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  {...register("requesterName")}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>

              {/* Requester Email */}
              <div className="form-control">
                <label className="label font-medium">Requester Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={user.email}
                  {...register("requesterEmail")}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>

              {/* Recipient Name */}
              <div className="form-control">
                <label className="label font-medium">Recipient Name</label>
                <input
                  type="text"
                  placeholder="Recipient full name"
                  {...register("recipientName", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Recipient District */}
              <div className="form-control">
                <label className="label font-medium">Recipient District</label>
                <input
                  type="text"
                  placeholder="District"
                  {...register("recipientDistrict", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Recipient Upazila */}
              <div className="form-control">
                <label className="label font-medium">Recipient Upazila</label>
                <input
                  type="text"
                  placeholder="Upazila"
                  {...register("recipientUpazila", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Hospital Name */}
              <div className="form-control">
                <label className="label font-medium">Hospital Name</label>
                <input
                  type="text"
                  placeholder="Hospital Name"
                  {...register("hospitalName", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Full Address */}
              <div className="form-control md:col-span-2">
                <label className="label font-medium">Full Address</label>
                <input
                  type="text"
                  placeholder="Full address"
                  {...register("fullAddress", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Blood Group */}
              <div className="form-control">
                <label className="label font-medium">Blood Group</label>
                <select
                  {...register("bloodGroup", { required: true })}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select blood group</option>
                  <option>A+</option>
                  <option>A−</option>
                  <option>B+</option>
                  <option>B−</option>
                  <option>AB+</option>
                  <option>AB−</option>
                  <option>O+</option>
                  <option>O−</option>
                </select>
              </div>

              {/* Donation Date */}
              <div className="form-control">
                <label className="label font-medium">Donation Date</label>
                <input
                  type="date"
                  {...register("donationDate", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Donation Time */}
              <div className="form-control">
                <label className="label font-medium">Donation Time</label>
                <input
                  type="time"
                  {...register("donationTime", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Request Message */}
            <div className="form-control">
              <label className="label font-medium">Request Message</label>
              <textarea
                placeholder="Write your request message..."
                {...register("requestMessage")}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary gap-2 px-6 py-2"
                disabled={donor.status === "blocked"}
              >
                <FiSend />
                Submit Request
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
