import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user.email}`);
      return res.data;
    },
  });

  const handleRequestDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your donation request has been deleted.",
              icon: "success",
            });
          }
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
                  <Link
                    onClick={() => handleRequestDelete(r._id)}
                    className="btn"
                  >
                    Delete
                  </Link>
                  {r.donationStatus === "inprogress" && (
                    <>
                      <button className="btn">Done</button>
                      <button className="btn">Cancel</button>
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

export default MyDonationRequests;
