import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
