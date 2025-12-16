import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateDonationRequest = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  const { data: request = [], refetch } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${id}`);
      return res.data;
    },
  });
  //   console.log(request);

  const handleUpdateRequest = (data) => {
    console.log(data);

    const updatedRequest = {
      recipientName: data.recipientName || request.recipientName,
      recipientDistrict: data.recipientDistrict || request.recipientDistrict,
      recipientUpazila: data.recipientUpazila || request.recipientUpazila,
      fullAddress: data.fullAddress || request.fullAddress,
      hospitalName: data.hospitalName || request.hospitalName,
      donationDate: data.donationDate || request.donationDate,
      donationTime: data.donationTime || request.donationTime,
      bloodGroup: data.bloodGroup || request.bloodGroup,
      requestMessage: data.requestMessage || request.requestMessage,
    };

    axiosSecure.put(`/requests/${id}`, updatedRequest).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your request info has been updated",
          showConfirmButton: false,
          timer: 1500,
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
            Update Donation Request
          </h1>

          <form
            onSubmit={handleSubmit(handleUpdateRequest)}
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
                  defaultValue={request.recipientName}
                  {...register("recipientName")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Recipient District */}
              <div className="form-control">
                <label className="label font-medium">Recipient District</label>
                <input
                  type="text"
                  placeholder="District"
                  defaultValue={request.recipientDistrict}
                  {...register("recipientDistrict")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Recipient Upazila */}
              <div className="form-control">
                <label className="label font-medium">Recipient Upazila</label>
                <input
                  type="text"
                  placeholder="Upazila"
                  defaultValue={request.recipientUpazila}
                  {...register("recipientUpazila")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Hospital Name */}
              <div className="form-control">
                <label className="label font-medium">Hospital Name</label>
                <input
                  type="text"
                  placeholder="Hospital Name"
                  defaultValue={request.hospitalName}
                  {...register("hospitalName")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Full Address */}
              <div className="form-control md:col-span-2">
                <label className="label font-medium">Full Address</label>
                <input
                  type="text"
                  placeholder="Full address"
                  defaultValue={request.fullAddress}
                  {...register("fullAddress")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Blood Group */}
              <div className="form-control">
                <label className="label font-medium">Blood Group</label>
                <select
                  {...register("bloodGroup")}
                  defaultValue={request.bloodGroup}
                  className="select select-bordered w-full"
                >
                  {/* <option>Select blood group</option> */}
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
                  defaultValue={request.donationDate}
                  {...register("donationDate")}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Donation Time */}
              <div className="form-control">
                <label className="label font-medium">Donation Time</label>
                <input
                  type="time"
                  defaultValue={request.donationTime}
                  {...register("donationTime")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Request Message */}
            <div className="form-control">
              <label className="label font-medium">Request Message</label>
              <textarea
                placeholder="Write your request message..."
                defaultValue={request.requestMessage}
                {...register("requestMessage")}
                className="textarea textarea-bordered w-full"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary gap-2 px-6 py-2">
                <FiSend />
                Update Request
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
