import React from "react";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (role !== "admin") {
    return (
      <div className="text-5xl text-red-700 font-bold">Forbidden Access</div>
    );
  }
  return children;
};

export default AdminRoute;
