// Logo.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group cursor-pointer w-fit">
      {/* Icon Container */}
      <div className="relative flex items-center justify-center bg-red-600 w-10 h-10 rounded-xl shadow-lg shadow-red-900/20">
        <Activity className="text-white w-6 h-6 stroke-[3px]" />

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-xl bg-red-600 animate-ping opacity-20"></span>
      </div>

      {/* Brand Name */}
      <span className="text-2xl font-black text-white tracking-tighter italic">
        PULSE<span className="text-red-600 not-italic">.</span>
      </span>
    </Link>
  );
};

export default Logo;
