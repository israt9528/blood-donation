import React from "react";
import { Outlet } from "react-router";
import Logo from "../Components/Shared/Logo/Logo";

const AuthLayout = () => {
  return (
    <div>
      <div>
        <Logo></Logo>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
