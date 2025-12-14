import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [] } = useQuery({
    queryKey: ["requests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/pending?donationStatus=pending`
      );
      return res.data;
    },
  });
  console.log(requests);

  return (
    <div>
      <div className="overflow-x-auto">
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

                <td>
                  <Link
                    to={`/dashboard/donation-request-details/${r._id}`}
                    className="btn"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequests;
