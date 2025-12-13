import React, { useRef } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FiArrowLeft,
  FiHeart,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiMail,
} from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const requestModalRef = useRef();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: request = [] } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${id}`);
      return res.data;
    },
  });

  //   console.log(request);

  const {
    bloodGroup,
    donationDate,
    donationTime,
    donationStatus,
    hospitalName,
    fullAddress,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    requestMessage,
    requesterName,
    requesterEmail,
    createdAt,
  } = request;

  const openDonationRequestModal = () => {
    requestModalRef.current.showModal();
  };

  const handleConfirmDonation = (data) => {
    console.log(data);
    const donationInfo = {
      donorName: data.donorName,
      donorEmail: data.donorEmail,
    };
    axiosSecure.patch(`/requests/${id}`, donationInfo).then((res) => {
      if (res.data.modifiedCount) {
        requestModalRef.current.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Donation request is in-progress`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-donation-request");
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-4 flex gap-2"
        >
          <FiArrowLeft /> Back
        </button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card bg-white shadow-xl rounded-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Blood Donation Request
              </h1>
              <p className="text-sm text-gray-500">
                Requested on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`badge badge-lg ${
                donationStatus === "pending"
                  ? "badge-warning"
                  : donationStatus === "approved"
                  ? "badge-info"
                  : "badge-success"
              }`}
            >
              {donationStatus}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-4">
              <Info
                icon={<FiUser />}
                label="Recipient Name"
                value={recipientName}
              />
              <Info
                icon={<FiMapPin />}
                label="Location"
                value={`${recipientUpazila}, ${recipientDistrict}`}
              />
              <Info
                icon={<FiHeart />}
                label="Blood Group"
                value={bloodGroup}
                highlight
              />
              <Info
                icon={<FiCalendar />}
                label="Donation Date"
                value={donationDate}
              />
              <Info
                icon={<FiClock />}
                label="Donation Time"
                value={donationTime}
              />
            </div>

            {/* Right */}
            <div className="space-y-4">
              <Info label="Hospital Name" value={hospitalName} />
              <Info label="Full Address" value={fullAddress} />
              <Info icon={<FiUser />} label="Requester" value={requesterName} />
              <Info
                icon={<FiMail />}
                label="Requester Email"
                value={requesterEmail}
              />
            </div>
          </div>

          {/* Message */}
          <div className="px-6 pb-6">
            <h3 className="font-semibold mb-2">Request Message</h3>
            <p className="bg-base-200 p-4 rounded-lg text-sm">
              {requestMessage}
            </p>
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={openDonationRequestModal}
              className="btn btn-primary flex gap-2"
            >
              <FiHeart /> Donate Now
            </button>

            <span className="text-sm text-gray-500 self-center">
              Saving a life starts with you ❤️
            </span>
          </div>
        </motion.div>
      </div>

      <dialog
        ref={requestModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Donor</h3>
          <div className="overflow-x-auto">
            <form
              onSubmit={handleSubmit(handleConfirmDonation)}
              className="space-y-4"
            >
              <div className="form-control">
                <label className="label font-medium">Donor Name</label>
                <input
                  type="text"
                  defaultValue={user.displayName}
                  {...register("donorName")}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label font-medium">Donor Email</label>
                <input
                  type="text"
                  defaultValue={user.email}
                  {...register("donorEmail")}
                  disabled
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

const Info = ({ icon, label, value, highlight }) => (
  <div className="flex gap-3 items-start">
    {icon && <span className="text-primary text-lg mt-1">{icon}</span>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-medium ${highlight ? "text-red-600 text-lg" : ""}`}>
        {value}
      </p>
    </div>
  </div>
);

export default DonationRequestDetails;
