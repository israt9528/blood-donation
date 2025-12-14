import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const AllBloodDonationRequestVolunteer = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === statusFilter);

  const handleDonationStatusUpdate = (request, status) => {
    const statusInfo = {
      donationStatus: status,
    };
    let message = `Donation status updated to ${status}`;
    axiosSecure
      .patch(`/requests/${request._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            All Donation Requests ({filteredRequests.length})
          </h2>

          <select
            className="select select-bordered max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Blood Group</th>
              <th>Donation Status</th>
              <th>Donor Information</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredRequests.map((r, i) => (
              <tr key={r._id}>
                <th>{i + 1}</th>
                <td>{r.recipientName}</td>
                <td>
                  <p>Upazila: {r.recipientUpazila}</p>
                  <p>District: {r.recipientDistrict}</p>
                </td>
                <td>{r.donationDate}</td>
                <td>{r.donationTime}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.donationStatus}</td>
                <td>
                  {" "}
                  <p>Name: {r.donorName}</p>
                  <p>Email: {r.donorEmail}</p>
                </td>
                <td>
                  <Link
                    to={`/dashboard/donation-request-details/${r._id}`}
                    className="btn"
                  >
                    View
                  </Link>

                  {r.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleDonationStatusUpdate(r, "done")}
                        className="btn"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleDonationStatusUpdate(r, "canceled")
                        }
                        className="btn"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodDonationRequestVolunteer;
