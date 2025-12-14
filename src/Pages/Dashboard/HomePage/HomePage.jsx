import React from "react";
import useRole from "../../../Hooks/useRole";
import AdminHomePage from "./AdminHomePage";
import VolunteerHomePage from "./VolunteerHomePage";
import DonorHomePage from "./DonorHomePage";

const HomePage = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <p>Loading.......</p>;
  }
  if (role === "admin") {
    return <AdminHomePage></AdminHomePage>;
  } else if (role === "volunteer") {
    return <VolunteerHomePage></VolunteerHomePage>;
  } else return <DonorHomePage></DonorHomePage>;
};

export default HomePage;
