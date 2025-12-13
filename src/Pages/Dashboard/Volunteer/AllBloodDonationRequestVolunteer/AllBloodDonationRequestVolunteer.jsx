import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllBloodDonationRequestVolunteer = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });
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
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name {requests.length}</th>
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
            {requests.map((r, i) => (
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
                  <Link
                    to={`/dashboard/update-donation-request/${r._id}`}
                    className="btn"
                  >
                    Edit
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
