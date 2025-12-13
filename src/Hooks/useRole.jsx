import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = "donor", isLoading } = useQuery({
    queryKey: ["donor-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donors/${user.email}/role`);
      return res.data?.role;
    },
  });
  return { role, isLoading };
};

export default useRole;
