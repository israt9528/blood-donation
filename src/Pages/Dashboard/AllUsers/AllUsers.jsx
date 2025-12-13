import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { HiDotsVertical } from "react-icons/hi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const { data: donors = [], refetch } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donors");
      return res.data;
    },
  });

  const handleDonorStatus = (donor, status) => {
    const donorStatus = {
      status: status,
    };
    let message = `User status updated to ${status}`;

    axiosSecure
      .patch(`/donors/${donor._id}/status`, donorStatus)
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
  const handleUpdateRole = (donor, role) => {
    const donorStatus = {
      role: role,
    };
    let message = `User role updated to ${role}`;

    axiosSecure.patch(`/donors/${donor._id}/role`, donorStatus).then((res) => {
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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Avater</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {donors.map((d, i) => (
              <tr key={i + 1}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={d.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.role}</td>
                <td>{d.status}</td>
                <td>
                  <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <HiDotsVertical />
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <button
                          onClick={() => handleDonorStatus(d, "blocked")}
                          className="btn"
                        >
                          Block
                        </button>
                        <button
                          onClick={() => handleDonorStatus(d, "active")}
                          className="btn"
                        >
                          Unblock
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleUpdateRole(d, "admin")}
                          className="btn"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() => handleUpdateRole(d, "volunteer")}
                          className="btn"
                        >
                          Make Volunteer
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
