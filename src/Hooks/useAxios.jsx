import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://blood-donation-server-jet.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
