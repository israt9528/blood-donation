import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="lg:px-20">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
