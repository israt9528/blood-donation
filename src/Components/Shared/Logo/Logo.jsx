import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo.jpeg";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo} alt="" className="w-15 h-15 rounded-full" />
      <span className="relative top-2 right-7.5 text-primary font-semibold">
        P
      </span>
      <p className="-ms-8.5 mt-9.5 text-sm font-medium">ulse</p>
    </Link>
  );
};

export default Logo;
